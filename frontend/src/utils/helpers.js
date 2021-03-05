export const changeScheme = (primaryColor, secondaryColor) => {
  const page = document.getElementsByTagName('html')[0];
  page.style.setProperty('--color-primary', primaryColor);
  page.style.setProperty('--color-secondary', secondaryColor);
}

