export function renderTemplate(page, args) {
  let code = page.match(/[{]{2}[\w\s]*[}]{2}/g); // cherche {{ mot }}
  code.forEach(element => {
    //    ar.push(element.substring(2,element.length-2).trim());
    let key = element.substring(2, element.length - 2).trim();
    if (
      element.substring(0, 2) == "{{" &&
      element.substring(element.length - 2, element.length) == "}}"
    ) {
      var regex = new RegExp("[{]{2}[\\s\\b" + key + "]*[}]{2}");
      page = page.replace(regex, args[key]); //remplace {{ mot }} par la valeur de la variable mot
    }
  });
  let i = 0;
  return page;
}
