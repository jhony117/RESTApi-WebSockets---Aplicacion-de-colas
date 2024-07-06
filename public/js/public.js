
 
// const lblTicket1 = document.querySelector('#lbl-ticket-01');
// const lblDesk1 = document.querySelector('#lbl-desk-01');


// const lblTicket2 = document.querySelector('#lbl-ticket-02');
// const lblDesk2 = document.querySelector('#lbl-desk-02');

// const lblTicket3 = document.querySelector('#lbl-ticket-03');
// const lblDesk3 = document.querySelector('#lbl-desk-03');
 
// const lblTicket4 = document.querySelector('#lbl-ticket-04');
// const lblDesk4 = document.querySelector('#lbl-desk-04');



async function getLastWorkingTickets(){
    const  lastWoorkingTickets = await fetch('/api/ticket/working-on')
    .then(resp => resp);

    if (lastWoorkingTickets === null) return;

    // lblTicket1.innerHTML = lastWoorkingTickets.at(-1).number; 
    // lblDesk1.innerHTML = lastWoorkingTickets.at(-1).handleAtDesk;

    // lblTicket2.innerHTML = lastWoorkingTickets.at(-2).number; 
    // lblDesk2.innerHTML = lastWoorkingTickets.at(-2).handleAtDesk;

    // lblTicket3.innerHTML = lastWoorkingTickets.at(-3).number; 
    // lblDesk3.innerHTML = lastWoorkingTickets.at(-3).handleAtDesk;

    // lblTicket4.innerHTML = lastWoorkingTickets.at(-4).number; 
    // lblDesk4.innerHTML = lastWoorkingTickets.at(-4).handleAtDesk;

for(let i = 0; i< lastWoorkingTickets.length; i++){
if (i>=4) break;

const ticket = lastWoorkingTickets[i];
if(!ticket) continue;

const lblTicket = document.querySelector(`#lbl-ticket-0${i +1}`);
const lblDesk = document.querySelector(`#lbl-desl-0${i +1}`);

lblTicket.innerText = `Ticket ${ticket.number}`;
lblDesk.innerText = ticket.handleAtdesk
}

 
} 
   getLastWorkingTickets();










function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      console.log(event.data);

        const {type} = json.parse(event.data);
        if( type != 'on-working-changed') return;
        getLastWorkingTickets();


    };
  
    socket.onclose = ( event ) => {
      setTimeout( () => {
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
  connectToWebSockets();
  
  