Handlebars.registerHelper("busTrim", function(value){
  if (value.indexOf(" to ") > -1) {
    return value.split(" to ")[1]
  }

  return value
})