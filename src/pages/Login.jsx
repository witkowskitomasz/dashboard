import { useState } from "react";

export default function Login({ setTrue }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData, // Kopiujemy stare dane (pamiętasz poprzednią lekcję?)
      [name]: value, // Dynamicznie nadpisujemy pole po nazwie (np. 'email')
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiegamy przeładowaniu strony
    setTrue(); // Ustawiamy stan logowania na true
    console.log("Form submitted with data:", formData);
    // Tutaj możesz dodać logikę logowania, np. wywołać funkcję z PocketBaseService
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col mt-16 gap-4">
          <input
            className="border-2 border-slate-700 rounded-xl p-4"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            className="border-2 border-slate-700 rounded-xl p-4"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit} className="bg-slate-700 text-white rounded-xl p-4">Login</button>
        </div>
      </div>
    </>
  );
}
