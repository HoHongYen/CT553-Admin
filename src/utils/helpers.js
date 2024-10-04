import slugify from 'slugify';
import moment from 'moment';
import 'moment/dist/locale/vi';
moment.locale('vi')

// export const formatCurrency = (value) =>
//   new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
//     value
//   );

export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const formatSlugify = (value) =>
  slugify(value, { lower: true, locale: 'vi' });

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatMonth = (date) => {
  return moment(date).format("MM/YYYY");
}

export const formatDateMonthYear = (date) => {
  return moment(date).format("LL");
}

export const formatDateTime = (date) => {
  return moment(date).format("HH:mm, DD/MM/YYYY");
}

export const formatDateTimeFromNow = (date) => {
  return moment(date).fromNow();
}

export const handleClickElement = (id) => {
  document.getElementById(id).click();
};

export const jumpToRelevantDiv = (id) => {
  const relevantDiv = document.getElementById(id);
  relevantDiv.scrollIntoView({ behavior: "smooth" });
};

export const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export const calculateRating = (reviews) => {
  if (!reviews.length) return 0;
  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  return (totalRating / reviews.length).toFixed(1);
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}
