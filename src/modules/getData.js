export default function getData() {
   const goodsWrapper = document.querySelector('.goods');
   return fetch('../db/db.json').then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error ('Es gibt einige Fehler: ' + response.status);
        }
    })
    .then(data => {
        return data;
    })
    .catch(err =>{
         console.warn(err); // об ошибке сообщение разработчику
         goodsWrapper.innerHTML = '<div style="color:red; font-size:2rem" >Etwas ist schief gelaufen</div>'; // об ошибке сообщение user
    });
}