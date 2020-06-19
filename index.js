// Login system

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // When potato is loged in
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if (user != null) {
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome: " + email_id;
  
        document.getElementById("user_token").innerHTML = "Your Token: " + user.uid;
  
      }
  
    } else {
      // When no potato is loged in
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login() {
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
  
      // Errors messages
  
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error: " + errorMessage);
  
  
    });
  
  }
  
  function logout() {
    firebase.auth().signOut();
  }

// Restricitions

  window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$(document).keydown(function(e){
  if(e.which === 123){
     return false;
  }
});

$(window).on('keydown',function(event)
    {
    if(event.keyCode==123)
    {
        return false;
    }
    else if(event.ctrlKey && event.shiftKey && event.keyCode==73)
    {
        return false;  //Prevent from ctrl+shift+i
    }
    else if(event.ctrlKey && event.keyCode==73)
    {
        return false;  //Prevent from ctrl+shift+i
    }
});
$(document).on("contextmenu",function(e)
{
e.preventDefault();
});


// Modals

// Modals

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal_account')
  modals.forEach(modal => {
    closeModal(modal)
  })
})
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal_2.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal_3.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal_account')
    closeModal(modal)
  })
})
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal_2')
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal_3')
    closeModal(modal)
  })
})


function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


