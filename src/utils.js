import ReactGA from 'react-ga';

export const isLocalHost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const isProduction = Boolean(
  process.env.NODE_ENV === 'production'
)

export const triggerGAEventPush = ({category, action, label}) => {
  if (isProduction) {
    ReactGA.event({category, action, label});
  }
}

export const setPageTitle = (str) => {
  const title = str ? `${str} | Slick Itinerary` : 'Slick Itinerary';
  document.title = title;
}

export const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const insertUrlParam = (key, value) => {
  if (window.history.pushState) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
      window.history.pushState({path: newurl}, '', newurl);
  }
}
