import store from '../state/store';

//CHANGE SCHEME ON LOGIN
export const changeScheme = (primaryColor, secondaryColor) => {
  const page = document.getElementsByTagName('html')[0];
  page.style.setProperty('--color-primary', primaryColor);
  page.style.setProperty('--color-secondary', secondaryColor);
}

//IIFE TO MAINTAIN SCHEME WHEN REFRESHING PAGE
(function schemeFromStorage () {
  const schemeFromStorage = localStorage.getItem('companyInfo');
  if (schemeFromStorage) {
    const { primaryColor, secondaryColor } = JSON.parse(schemeFromStorage);
    changeScheme(primaryColor, secondaryColor);
  }
})();

//GET TOKEN FROM LOCAL STORAGE
export const getToken = () => {
  const state = store.getState();
  return state.userLogin.userInfo.token;
}

