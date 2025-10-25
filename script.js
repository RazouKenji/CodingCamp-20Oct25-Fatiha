
(() => {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  
  const nameSpan = $("#welcomeName");
  if (nameSpan) {
    let stored = sessionStorage.getItem("visitorName");
    if (!stored) {
      const ans = prompt("Hi! What's your name?");
      if (ans && ans.trim() !== "") {
        stored = ans.trim();
        sessionStorage.setItem("visitorName", stored);
      }
    }
    const finalName = sessionStorage.getItem("visitorName");
    if (finalName && finalName.trim() !== "") nameSpan.textContent = finalName;
  }

  
  const dateBox = $("#currentDate");
  if (dateBox) {
    const updateNow = () =>
      (dateBox.textContent = "Current Date: " + new Date().toLocaleString());
    updateNow();
    setInterval(updateNow, 60 * 1000);
  }

  
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // bersihkan error
      $$(".error", form).forEach((el) => (el.textContent = ""));

      const name   = $("#name", form)?.value.trim() || "";
      const birth  = $("#birth", form)?.value || ""; // yyyy-mm-dd
      const gender =
        (form.querySelector('input[name="gender"]:checked') || {}).value || "";

      let valid = true;
      if (!name)   { $('[data-for="name"]', form).textContent   = "Name is required."; valid = false; }
      if (!birth)  { $('[data-for="birth"]', form).textContent  = "Birth date is required."; valid = false; }
      if (!gender) { $('[data-for="gender"]', form).textContent = "Please choose gender."; valid = false; }
      if (!valid) return;

      
      const birthPretty = new Date(birth).toLocaleDateString();

      const out = [
        "Submitted Data",
        `— Name: ${name}`,
        `— Birth Date: ${birthPretty}`,
        `— Gender: ${gender}`
      ].join("\n");

      const view = $("#submittedData");
      if (view) view.textContent = out;

      form.reset();
    });
  }

  
  $$(".nav a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = $(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      }
    });
  });
})();
