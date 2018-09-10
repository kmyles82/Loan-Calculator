//listen for submit button
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    //hide results
    document.querySelector('#results').style.display = 'none';
    //show loader a
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


//calculate results
function calculateResults() {
    // console.log('calculating...')
    //UI variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value * 12);

    //computer monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatePayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

        //show results
        document.querySelector('#results').style.display = 'block';

        //hide loader
        document.querySelector('#loading').style.display = 'none';
    } else {
        // console.log('Please check your numbers');
        showError('Please check your number');
    }
}

function showError(error) {
    //hide results
    document.querySelector('#results').style.display = 'none';
    //hide loader
    document.querySelector('#loading').style.display = 'none';
    //create a div
    const errorDiv = document.createElement('div');
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';
    //add text node and append to div
    errorDiv.appendChild(document.createTextNode(error))
    //insert error about heading
    card.insertBefore(errorDiv, heading);
    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}