function fact(n) {
    if (n === 0 || n === 1)
        return 1;
    else
       return n*fact(n-1)
}

// console.log(fact(6));

function applique(f, tab){
   let res = []
   for (let i = 0; i < tab.length; i++) {
      res.push(f(tab[i]))
   }
   return res
};

// console.log(applique(fact,[1,2,3,4,5,6]))
// console.log(applique(function(n) { return (n+1); } , [1,2,3,4,5,6]));

// msgs = [
//   { "msg" : "Hello World" },
//   { "msg" : "Blah Blah" },
//   { "msg" : "I love cats" }
// ];

// // Button function
// function update(msg){
//    const list = document.querySelector("ul");

//    list.innerHTML = ""
//    for (let i = 0; i < msg.length; i++)
//        list.innerHTML += "<li>" + msg[i].msg + "</li>"
// };

// // Ca peut marcher juste comme ca mais ca se déclenche sur nimporte quel click alors que je veux juste sur le bouton
// //document.addEventListener("click" , function() {update(msgs)});

// document.getElementById("send").addEventListener("click" , function() {update(msgs)});

// Nouvelle version de messages avec la date et le pseudo

// msgs = [
//     { "msg" : "Hello World", "date" : "06/03/2026 15:15:59", "pseudo" : "Alice" },
//     { "msg" : "Blah Blah", "date" : "06/03/2026 15:16:10", "pseudo" : "Bob" },
//     { "msg" : "I love cats", "date" : "06/03/2026 15:17:03", "pseudo" : "Charlie" }
// ]

msgs = []

function update_new(msg){
   const list = document.getElementById("messages")
   list.innerHTML = ""
   for (let i = 0; i < msg.length; i++){
      const li = document.createElement("li")
      li.innerHTML = "<strong>" + msg[i].pseudo + "</strong> (" + msg[i].date + ") : " + msg[i].msg
      list.appendChild(li)
   }
}

// document.getElementById("refresh").addEventListener("click" , function() {update_new(msgs)});
document.getElementById("refresh").addEventListener("click" , function() { chargerMessages() });

function add_Message(){
   const pseudoInput = document.getElementById("pseudo")
   const messageInput = document.getElementById("message")

   // Vérifier que les champs ne sont pas vides
     const pseudo = pseudoInput.value.trim();
     const texte = messageInput.value.trim();
   if (pseudo === "" || texte === "")
       alert("Veuillez remplir tous les champs.");

   const date = new Date().toLocaleString()
   const newMessage = { "msg" : texte, "date" : date, "pseudo" : pseudo }
   msgs.push(newMessage)
   update_new(msgs)

   // Réinitialiser le message (on peut garder le pseudo)
   messageInput.value = "";
      
}

// document.getElementById("send").addEventListener( "click" , function() {add_Message(msgs)})
document.getElementById("send").addEventListener("click", function() { add_Message() })

// Gérer le passage au mode sombre 
document.getElementById("Bravo_six_going_dark").addEventListener("click", function(){
    document.body.classList.toggle( "dark-mode" );
    const button = document.getElementById("Bravo_six_going_dark");
    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "Passer en mode clair";
    } else {
        button.textContent = "Passer en mode sombre";
    }
});

update_new(msgs);

// TP2

//url du microservice
const SERVER_URL = 'https://543e09c3-7e93-4422-9f8f-9307dd246a57-00-2pmcjwyo8i0wj.kirk.replit.dev';

function chargerMessages(){
   fetch(SERVER_URL + '/msg/getAll')
   .then(function(response) {
      return response.json();
   })
   .then(function(data) {
      msgs = data
      update_new(msgs)
   });
}

function add_Message(){
    console.log("add_Message")
   const pseudoInput = document.getElementById("pseudo")
   const messageInput = document.getElementById("message")

   const pseudo = pseudoInput.value.trim();
   const texte = messageInput.value.trim();
   if (pseudo === "" || texte === "")
       alert("Veuillez remplir tous les champs.");

   const payload = encodeURIComponent(texte + "|" + pseudo);
   fetch(SERVER_URL + '/msg/post/' + payload)
      .then(function(response) { return response.json(); })
      .then(function(data) {
         if (data.code === 1){
            messageInput.value = "";
            chargerMessages();
         }
      })
}


chargerMessages();
