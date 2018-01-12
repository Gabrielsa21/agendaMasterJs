(function(){
//UI - user interface
var ui = {
 fields: document.querySelectorAll("input"),
 button: document.querySelector(".pure-button"),
 list: document.querySelector(".pure-table tbody")


};
//Actions
var validateFields = function(e){
  //console.log(arguments); //debugger;
  e.preventDefault();
  var errors = 0;
  var data = {};
  ui.fields.forEach(function(field){
    //console.log(field.value, field.value.length);
      if (field.value.trim().length === 0){
          field.classList.add("error");
          errors++;
      }else{
        field.classList.remove("error");
        data[field.id] = field.value;
      }
  });
  //console.log(errors, data);
  if(errors > 0){
    document.querySelector(".error").focus();
  }else{
    storeData(data);
  }

};

var storeData = function(data){
  var list = (localStorage.schedule)? JSON.parse(localStorage.schedule):[];
  list.push(data);
  localStorage.schedule = JSON.stringify(list);
  cleanFields();
  listAll();
};

var cleanFields = () => ui.fields.forEach(field => field.value = "");

var listAll = function(){
  if(localStorage && localStorage.schedule){
    var contacts = JSON.parse(localStorage.schedule);
    var html = [];
    //console.table(contacts);
    contacts.forEach((contact, index) => {
      //console.log(contact.name, contact.email, contact.telefone );
      var line = `<tr>
                      <td>${index}</td>
                      <td>${contact.name}</td>
                      <td>${contact.email}</td>
                      <td>${contact.telefone}</td>
                      <td><a href="#" data-action="delete" data-id="${index}">Excluir</a></td>
                  </tr>`;

      html.push(line);

    });

    ui.list.innerHTML = html.join("");
  };
}

var deleteItem = function(e){
  //debugger;
  e.preventDefault();

  var context = e.target.dataset;

  if( context.action === "delete"){
    console.log("excluir", context.id);
    var contacts = JSON.parse(localStorage.schedule);
    contacts.splice(context.id, 1);
    localStorage.schedule = JSON.stringify(contacts);
    listAll();
  }

}

var init = function(){
 //Mapping events
 ui.button.addEventListener("click", validateFields);
 listAll();
 ui.list.addEventListener("click", deleteItem);

}();
})();
