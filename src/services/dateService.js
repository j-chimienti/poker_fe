export function secondsUntil(nextHandStart) {

    if (!nextHandStart) return 0;
  // Set the date we're counting down to
    var countDownDate = new Date(nextHandStart).getTime();
// Update the count down every 1 second

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // const dateTimeDisplay = days + "d " + hours + "h "
    //   + minutes + "m " + seconds + "s ";

    // const timeDisplay = `${seconds}s`

    // If the count down is finished, write some text
    if (distance <= 0) return 0
    else return seconds
}
