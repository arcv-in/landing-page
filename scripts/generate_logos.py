import os
import urllib.request
import re
import subprocess
import tempfile
from PIL import Image

ACQUIRERS = {
    'cielo': ('Cielo', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/01027058.svg'),
    'rede': ('Rede', 'https://developer.userede.com.br/assets/images/logo-rede-orange-new.svg'),
    'stone': ('Stone', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/16501555.svg'),
    'pagbank': ('PagBank', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/08561701.svg'),
    'getnet': ('Getnet', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/10440482.svg'),
    'mercadopago': ('Mercado Pago', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/10573521.svg'),
    'infinitepay': ('InfinitePay', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/18189547.svg'),
    'safrapay': ('SafraPay', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/03017677.svg'),
    'asaas': ('Asaas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/19540550.svg'),
    'adyen': ('Adyen', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adyen.svg'),
    'ebanx': ('EBANX', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/21018182.svg'),
}

BANKS = {
    'itau': ('Itaú Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/60701190.svg'),
    'bradesco': ('Bradesco Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/60746948.svg'),
    'bb': ('Banco do Brasil', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/00000000.svg'),
    'santander': ('Santander Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/90400888.svg'),
    'nubank': ('Nubank PJ', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/18236120.svg'),
    'inter': ('Inter Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/00416968.svg'),
    'c6': ('C6 Bank Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/31872495.svg'),
    'btg': ('BTG Pactual Empresas', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/30306294.svg'),
    'cora': ('Cora PJ', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/37880206.svg'),
    'sicoob': ('Sicoob', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/02038232.svg'),
    'sicredi': ('Sicredi', 'https://raw.githubusercontent.com/rzmt/logos-bancos-br/main/logos/svg/01181521.svg'),
}

def clean_svg(name, svg_text):
    s = svg_text
    # Remove top-level white / background rectangle that is just an artboard filler
    if name == 'stone':
        s = s.replace('<rect width="512" height="512" fill="white"/>', '')
    elif name == 'getnet':
        s = s.replace('<rect width="512" height="512" fill="white"/>', '')
    elif name == 'cielo':
        s = s.replace('fill="#5A646E"', 'fill="#FFFFFF"')
    elif name == 'infinitepay':
        s = s.replace('.st1{fill:#171527;}', '.st1{fill:#FFFFFF;}')
    elif name == 'safrapay':
        s = s.replace('<rect width="512" height="512" fill="white"/>', '')
        s = s.replace('fill="#00003F"', 'fill="#FFFFFF"')
    elif name == 'santander':
        s = s.replace('<rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="512" height="512"></rect>', '')
    elif name == 'sicredi':
        s = s.replace('<g clip-path="url(#clip0_20712_48002)">', '<g>').replace('<rect width="512" height="512" fill="white"/>', '', 1)
    elif name in ['bb', 'btg', 'cora']:
        s = s.replace('<rect width="512" height="512"', '<rect width="512" height="512" rx="96" ry="96"')
    elif name == 'adyen':
        s = s.replace('<svg ', '<svg fill="#0ABF53" ')
    elif name == 'c6':
        s = s.replace('fill="#242424"', 'fill="#FFFFFF"').replace('fill="#000000"', 'fill="#FFFFFF"')
    return s

def process_logo(name, label, url, out_path, is_compact=False):
    print(f"Processing {name} ({label})...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    svg_raw = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    svg = clean_svg(name, svg_raw)

    with tempfile.TemporaryDirectory() as td:
        svg_file = os.path.join(td, 'logo.svg')
        html_file = os.path.join(td, 'render.html')
        raw_png = os.path.join(td, 'raw.png')

        with open(svg_file, 'w', encoding='utf-8') as f:
            f.write(svg)

        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body {{
    margin: 0;
    padding: 0;
    background: transparent !important;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 600px;
  }}
  img {{
    max-width: 560px;
    max-height: 560px;
    display: block;
  }}
</style>
</head>
<body>
  <img src="logo.svg" />
</body>
</html>''')

        cmd = [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '--headless=new',
            '--disable-gpu',
            '--default-background-color=00000000',
            f'--screenshot={raw_png}',
            '--window-size=600,600',
            html_file
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        if not os.path.exists(raw_png):
            print(f"ERROR: Failed to render {name}")
            return False

        im = Image.open(raw_png).convert('RGBA')
        bbox = im.getbbox()
        if not bbox:
            print(f"ERROR: empty bbox for {name}")
            return False

        cropped = im.crop(bbox)
        cw, ch = cropped.size

        # Standard canvas dimensions (standard high-res @2x: 240x80)
        TARGET_W, TARGET_H = 240, 80
        canvas = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))

        # Determine target size based on aspect ratio
        aspect = cw / ch
        if is_compact or 0.75 <= aspect <= 1.35:
            # Compact / Square emblem (e.g. Itaú, Bradesco, Santander, Inter, Nubank)
            target_scale_h = 62
            target_scale_w = int(target_scale_h * aspect)
            if target_scale_w > 90:
                target_scale_w = 90
                target_scale_h = int(target_scale_w / aspect)
        else:
            # Wide horizontal wordmark (e.g. Cielo, Rede, Mercado Pago, InfinitePay, Adyen, Ebanx)
            target_scale_w = 160
            target_scale_h = int(target_scale_w / aspect)
            if target_scale_h > 52:
                target_scale_h = 52
                target_scale_w = int(target_scale_h * aspect)

        resized = cropped.resize((max(1, target_scale_w), max(1, target_scale_h)), Image.Resampling.LANCZOS)
        
        # Center on canvas
        pos_x = (TARGET_W - resized.width) // 2
        pos_y = (TARGET_H - resized.height) // 2
        canvas.paste(resized, (pos_x, pos_y), resized)

        canvas.save(out_path, 'PNG', optimize=True)
        print(f"OK: {name} -> {out_path} (original={cw}x{ch}, scaled={resized.width}x{resized.height})")
        return True

def main():
    base_dir = '/Users/adryanalencar/Documents/arcv/sources/landing-page/public/logos'
    acquirers_dir = os.path.join(base_dir, 'acquirers')
    banks_dir = os.path.join(base_dir, 'banks')
    os.makedirs(acquirers_dir, exist_ok=True)
    os.makedirs(banks_dir, exist_ok=True)

    print("=== Generating Acquirers Logos ===")
    for k, (label, url) in ACQUIRERS.items():
        out = os.path.join(acquirers_dir, f"{k}.png")
        process_logo(k, label, url, out)

    print("\n=== Generating Banks & Fintechs PJ Logos ===")
    for k, (label, url) in BANKS.items():
        out = os.path.join(banks_dir, f"{k}.png")
        process_logo(k, label, url, out)

if __name__ == '__main__':
    main()
