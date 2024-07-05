

const currentTicketLbl = document.querySelector('span');
const createTicketBtn =  document.querySelector('button');


 getLastTicket  = async() => {
  const lastTicket = await fetch('/api/ticket/last').then(resp =>resp.json());
  currentTicketLbl.innerText = lastTicket;
}

async function createTicket() {
    const newTicket = await fetch('/api/ticket', {
        method: 'POST'
    }).then(resp => resp.json());

    currentTicketLbl.innerText = newTicket.number;
}

createTicketBtn.addEventListener('click', createTicket);

getLastTicket();






