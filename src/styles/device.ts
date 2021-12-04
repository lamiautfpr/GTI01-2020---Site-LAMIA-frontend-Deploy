enum size {
  mobileS = '320px',
  mobileM = '375px',
  mobileL = '425px',
  tablet = '768px',
  laptop = '1024px',
  laptopL = '1200px',
  laptopLL = '1400px',
  desktop = '2560px',
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  laptopLL: `(max-width: ${size.laptopLL})`,
  desktop: `(max-width: ${size.desktop})`,
};
