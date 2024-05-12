export function scrollToBottom(id: string, delay: number = 1000) {
  setTimeout(() => {
    const chatContainer = document.getElementById(id);
    chatContainer?.scrollTo({
      top: chatContainer.scrollHeight + 100,
      behavior: "smooth",
    });
  }, delay);
}

export function scrollToTop(id: string) {
  const chatContainer = document.getElementById(id);
  chatContainer?.scrollTo({ top: 0, behavior: "smooth" });
}

export function convertFileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}