
//Referencias html

const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');


const searchParams = new URLSearchParams(window.location.search);

// console.log(searchParams
// );

if(!searchParams.has('escritorio')) {
window.location = 'index.html';
throw new Error('Escritorio es requerido');
}

const deskNumber = searchParams.get('escritorio');
deskHeader.innerHTML =deskNumber;


function checkTicketCount(currentCount = 0) {
    if(currentCount === 0) {
        noMoreAlert.classList.remove('d-none');
    }else{
        noMoreAlert.classList.add('d-none');
    }
    lblPending.innerHTML = currentCount;
 }

async function loadInitialCount() {
   const pendingTickets = await fetch('/api/ticket/pending').then(resp=> resp.json());
   checkTicketCount(pendingTickets.length);
}



function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
    //   console.log(event.data); //on-ticket-count-changed
    //   lblPending.innerHTML = event.data.payload ;
      const {payload, type} = JSON.parse(event.data)

      if(type !== 'on-ticket-count-changed')return ;
    //   lblPending.innerHTML =payload ;
checkTicketCount(payload);
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
  






//init 
loadInitialCount();
connectToWebSockets();
