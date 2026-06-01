# 📍 All "Meridian Books" Locations in Project

## 🎯 Main Brand Name Locations (Change These!)

### 1. **Brand Constants File** ⭐ MOST IMPORTANT
**File:** `frontend/src/constants/brand.js`
**Line 2:**
```javascript
name: 'Meridian Books',
```
**Line 3:**
```javascript
shortName: 'Meridian',
```
**Line 6:**
```javascript
email: 'hello@meridianbooks.com',
```

---

### 2. **HTML Page Title**
**File:** `frontend/index.html`
**Line 7:**
```html
<title>Meridian Books | Curated Reads, Delivered with Care</title>
```
**Line 6:**
```html
<meta name="description" content="Meridian Books — curated titles..." />
```

---

### 3. **Footer Component**
**File:** `frontend/src/components/Footer.jsx`
**Line 16:**
```javascript
Independent bookstore · Microservices-powered platform
```

---

### 4. **Home Page**
**File:** `frontend/src/pages/Home.jsx`
**Line 230:**
```javascript
<h2>Join the Meridian reading list</h2>
```

---

### 5. **Brand Constants - Testimonials**
**File:** `frontend/src/constants/brand.js`
**Line 52:**
```javascript
quote: 'The Meridian Rewards program actually saves me money...'
```

---

## 🎨 Color Theme (meridian-* colors)

These are CSS color classes - you DON'T need to change these unless you want to change the color scheme:

**File:** `frontend/tailwind.config.js`
```javascript
meridian: {
  50: '#faf7f2',
  100: '#f3ede3',
  // ... more colors
}
```

**Used in:**
- `frontend/src/index.css` (button styles)
- `frontend/src/pages/Home.jsx` (text colors)
- `frontend/src/pages/AdminDashboard.jsx` (text colors)
- Many other component files

---

## ✏️ How to Change "Meridian Books" to Your Name

### **Step 1: Change Brand Name**
Edit: `frontend/src/constants/brand.js`

```javascript
export const BRAND = {
  name: 'Your Bookstore Name',        // Change this
  shortName: 'YourName',              // Change this
  tagline: 'Your tagline here',
  founded: 'Est. 2024',
  email: 'hello@yourbookstore.com',   // Change this
  phone: '+1 (800) 555-0142',
};
```

### **Step 2: Change HTML Title**
Edit: `frontend/index.html`

```html
<title>Your Bookstore Name | Your Tagline</title>
<meta name="description" content="Your Bookstore Name — your description" />
```

### **Step 3: Change Testimonial Text**
Edit: `frontend/src/constants/brand.js` (line 52)

```javascript
quote: 'The [Your Name] Rewards program actually saves me money...'
```

### **Step 4: Change Newsletter Section**
Edit: `frontend/src/pages/Home.jsx` (line 230)

```javascript
<h2>Join the [Your Name] reading list</h2>
```

### **Step 5: Rebuild Frontend**
```cmd
cd frontend
npm run build
```

---

## 🎨 Optional: Change Color Theme

If you want to change the "meridian" color scheme:

Edit: `frontend/tailwind.config.js`

Change the color name from `meridian` to your brand name:
```javascript
colors: {
  yourbrand: {  // Change from 'meridian'
    50: '#faf7f2',
    // ... colors
  }
}
```

Then find and replace all `meridian-` with `yourbrand-` in CSS files.

---

## 📋 Quick Summary

**To change website name, edit these 4 files:**

1. ✅ `frontend/src/constants/brand.js` (lines 2, 3, 6, 52)
2. ✅ `frontend/index.html` (lines 6, 7)
3. ✅ `frontend/src/pages/Home.jsx` (line 230)
4. ✅ Rebuild: `npm run build`

**Color theme (optional):**
- `frontend/tailwind.config.js` - Change color definitions
- Find/replace `meridian-` in all CSS files

---

## 🚀 After Changes

1. Rebuild frontend: `npm run build`
2. Rebuild Docker image: `docker-compose build frontend`
3. Restart containers: `docker-compose up -d`
4. Or use Jenkins: Click "Build Now"

---

**Note:** The "meridian" in CSS classes (like `text-meridian-600`) is just a color theme name. You can keep it or change it - it won't affect the visible brand name!
