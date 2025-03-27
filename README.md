# Dynamic Form Builder

A **Dynamic Form Builder** application built with **Angular**, **Bootstrap**, and **Angular Material**. This app allows users to dynamically add various types of form fields, customize their properties, and render an interactive form in real time.

## 🚀 Features
- **Dynamic Form Creation**: Add, remove, and customize fields dynamically.
- **Supported Field Types**:
  - Text Input
  - Textarea
  - Dropdown
  - Checkbox
  - Radio Buttons
- **Validation Rules**: Required, Min/Max Length (for text fields only).
- **Real-Time Form Update**: Changes reflect instantly in the preview.
- **Error Handling**: Prevents submission if required fields are empty.
- **Bootstrap & Angular Material UI**: Clean and professional design.
- **Form Submission**: Logs form data to the console with a success message.

---

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR-USERNAME/Dynamic-Form-Builder.git
cd Dynamic-Form-Builder
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Application
```sh
ng serve
```
The application will run at: **http://localhost:4200**

---

## 🛠 Configuration & Usage
### Adding Fields:
- Click on **'Add Field'** and select a field type.
- Provide a **Label** and **Placeholder** (required for text-based fields).
- For dropdowns, checkboxes, and radio buttons, provide **options**.
- Click **'Generate Form'** (button remains disabled until all required values are set).

### Editing/Removing Fields:
- Click the **Red Cross** ❌ to remove a field.
- Modify fields dynamically, and changes will reflect in the form preview.

### Submitting the Form:
- Click **Submit** after filling in all required fields.
- Data is logged to the **console**.
- A **Snackbar notification** confirms successful submission.

---

## 📜 File Structure
```plaintext
Dynamic-Form-Builder/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dynamic-form/
│   │   │   │   ├── dynamic-form.component.ts
│   │   │   │   ├── dynamic-form.component.html
│   │   │   │   ├── dynamic-form.component.css
│   │   │   ├── form-preview/
│   │   │   │   ├── form-preview.component.ts
│   │   │   │   ├── form-preview.component.html
│   │   │   │   ├── form-preview.component.css
│   │   ├── services/
│   │   │   ├── dynamic-form.service.ts
│   │   ├── models/
│   │   │   ├── form-field.model.ts
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
├── angular.json
├── package.json
├── README.md
```

---

## ⚡ Technologies Used
- **Angular** (14)
- **Bootstrap**
- **Angular Material**
- **TypeScript**
- **RxJS**

---

## 📌 Notes
- Ensure **Node.js (v16+)** and **Angular CLI** are installed.
- Run `npm audit fix` if you encounter dependency issues.
- Use **F12 (DevTools)** to check console logs.

---

## 🤝 Contributing
Feel free to fork this repository and contribute. Pull requests are welcome!

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 📧 Contact
For any issues, feel free to raise an **Issue** or contact me on **GitHub**.

Happy Coding! 🚀

