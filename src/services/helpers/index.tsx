const getProductType = (i: number) => {
  switch (i) {
    case 1:
      return "Xom tovuq";
    case 2:
      return "Yarim tayyor";
    case 3:
      return "Muzlagan";
    default:
      return "-"
  }
};

export default {
  getProductType
};