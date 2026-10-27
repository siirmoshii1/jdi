# JDI SYSTEM — Enterprise User Manual & System Architecture Portal

A modern, responsive, zero-dependency static web application for the **JDI SYSTEM** user manual and progress report, created directly from `udpated__JDI SYSTEM_1_1.docx`.

---

## 🌟 Key Features

- **100% Static & Self-Contained**: Plain HTML5, Vanilla CSS3, and ES6 JavaScript. No bundlers or build steps required.
- **Complete Content**: Includes the full 11-module **System Progress Report & Architecture Matrix** and all step-by-step **User Guides** with all **35 high-resolution UI screenshots**.
- **Interactive Screenshot Lightbox**: Click any image to view in enlarged fullscreen mode with captioning and keyboard navigation (`ESC`, `←`, `→`).
- **Live Search Modal**: Press <kbd>Ctrl</kbd> + <kbd>K</kbd> or click the search bar to instantly filter modules, guides, and steps.
- **Interactive Verification Checklist**: Built-in test verification checkboxes with persistent progress tracking in `localStorage`.
- **Dark / Light Theme Switcher**: Automatically adapts to user system preference or manual toggle with saved persistence.
- **Print & PDF Optimized**: Dedicated print stylesheet formatted cleanly for paper documentation or PDF export (`Ctrl + P`).
- **Dynamic Font Resizer**: `A-` / `A+` controls for accessible reading.
- **Fully Responsive**: Mobile-friendly navigation drawer, collapsible menus, and touch gestures.

---

## 📂 File Structure

```
manual/
├── index.html              # Main documentation portal
├── assets/
│   ├── css/
│   │   └── style.css       # Complete modern styling & print stylesheet
│   ├── js/
│   │   └── app.js          # Interactive search, theme, lightbox, checklist
│   ├── favicon.svg         # High-resolution vector logo
│   └── images/             # 35 high-resolution UI screenshots from Word doc
│       ├── image1.png ... image35.png
└── README.md               # Deployment and usage guide
```

---

## 🚀 How to Run Locally

### Option 1: Via Local WAMP / Apache (Already Active)
Since this manual is located in `c:\wamp64\www\jtcinv-jm\manual\`, simply navigate to:
```
http://localhost/jtcinv-jm/manual/
```

### Option 2: Double-Click
Simply double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 3: Python Local Server
```bash
cd "c:\wamp64\www\jtcinv-jm\manual"
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080).

---

## 🌐 How to Deploy Online

### 1. GitHub Pages (Free)
1. Initialize a git repository in `manual` or push the folder to your GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for JDI manual"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In GitHub, go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**, choose `main`, `/ (root)`, and click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify (Drag & Drop in 10 seconds)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `manual` folder directly onto the browser window.
3. Your site is instantly live with a free custom SSL URL!

### 3. Vercel
1. Install Vercel CLI: `npm i -g vercel` (or link via GitHub).
2. Inside `manual/`, run:
   ```bash
   vercel
   ```
3. Follow the quick prompts to deploy.

### 4. Cloudflare Pages
1. Go to your Cloudflare Dashboard &rarr; **Pages** &rarr; **Create a Project**.
2. Connect your Git repository or use direct asset upload.
3. Set build directory to `.` (root).

### 5. Traditional Web Server (Apache / Nginx / cPanel)
Upload the entire `manual` folder to your server's `public_html/` or document root.

---

## 📋 Documented Modules & Workflows

1. **System Progress Report Architecture**:
   - Purchases
   - Sales
   - Management
   - Inventory
   - Warehouse
   - Customer
   - Products
   - Suppliers
   - Salesman
   - Branch
   - HR & User Security
2. **Purchase Order (PO)**: Header modal, warehouse selection, DOI recommendations, reorder planner, item adding, saving, and printing.
3. **Purchase Receiving (RR)**: Delivery verification, received quantities, bin locations, expiration dates, saving receiving receipt, and printing RR.
4. **Sales Order (SO)**: Customer selection, terms, adding products, automated tiered discount calculations, saving order, and printing SO.
5. **Sales Invoice (SI)**: Conversion of Sales Order, barcode scanner hardware workflow, invoice finalization, and printing official SI.
6. **Products Master**: Registering new SKUs, automated Case Price & Loose Price calculation from Bare Cost and Markup, viewing/editing, scheduling future price changes, and Excel catalog exporting.
