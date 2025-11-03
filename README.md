# 🧩 react-functional-component-generator

A **CLI tool** to quickly generate React components with your preferred coding standards, file structure, and templates.

> ⚡ Simplify your workflow — generate ready-to-use functional React components in seconds.

---

## 🚀 Features

✅ Create functional components with one command  
✅ Custom folder structure (auto-created)  
✅ Optional CSS and test file generation  
✅ Configurable templates for your team’s rules  
✅ Supports **JavaScript** and **TypeScript**  
✅ Easy to extend and publish as your own dev tool  

---

## 📦 Installation

```bash
npm install -g react-functionalcomponent-generator
```
---

## ⚙️ Usage

Generate a component with:

```cmd
react-cli g c Button
```

This creates:

```
src/components/Button/
 ├── Button.jsx
 ├── Button.css
```

---

## 🧠 Example Output

**Button.jsx**
```jsx
import './Button.css';

export default function Button() {
  return (
    <div className="Button">
      <h2>Button</h2>
    </div>
  );
}
```

**Button.css**
```css
.Button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
```

---

## 🧩 Commands

| Type      | Folder           | Example              |
| --------- | ---------------- | -------------------- |
| Component | `src/components` | `react-cli g c Card`      |
| Page      | `src/pages`      | `react-cli g p Dashboard` |
| Hook      | `src/hooks`      | `react-cli g h useAuth`   |

---
## 🔤 File Type Control
| Flag   | Description                                        |
| ------ | -------------------------------------------------- |
| `--ts` | Use TypeScript syntax (`.tsx` / `.ts`)             |
| `--js` | Use JavaScript syntax (`.jsx` / `.js`) *(default)* |


---
🧑‍💻 Author

LAKSHA SOLUTIONS

🖥️ https://lakshasolutions.in

📦 npm: https://www.npmjs.com/package/react-cli-generator

---
## 📃 License

MIT © Laksha Solutions
