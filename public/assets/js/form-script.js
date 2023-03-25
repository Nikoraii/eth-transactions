const formTransactions = document.getElementById('transactions');
const resultDivTransactions = document.getElementById('result-transactions');

const formBalance = document.getElementById('balance');
const resultDivBalance = document.getElementById('result-balance');

const formTokens = document.getElementById('tokens');
const resultDivTokens = document.getElementById('result-tokens');

formBalance.addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = $("#wallet-address-balance").val();
    const date = $("#date-input").val();
    $("#loader-balance").removeClass('hide-load');
    const formData = new FormData(formBalance);
    $("#wallet-address-balance").val();
    $("#date-input").val();
    const response = await fetch(`balance?address=${address}&date=${date}`, {
        method: 'get',
    });
    let show;
    if (response.ok) {
        let balance = await response.json();
        show = `
        <h4>Account: ${address}</h4>
        <h4>Date: ${date}</h4>
        <h4>Balance: ${balance} ETH</h4>
        `
    } else {
        show = `
        <h2>Looks like your request didn't pass through. Please check that you entered valid address and try again.</h2>
        `
    }
    $('#loader-balance').addClass('hide-load');
    resultDivBalance.innerHTML = show;
});

formTokens.addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = $("#tokens-address").val();
    const date = $("#date-input-tokens").val();
    const token = $("#token-address").val();
    $("#loader-tokens").removeClass('hide-load');
    const formData = new FormData(formTokens);
    $("#tokens-address").val();
    $("#date-input-tokens").val();
    const response = await fetch(`tokens?address=${address}&date=${date}&token=${token}`, {
        method: 'get',
    });
    let show;
    if (response.ok) {
        let tokens = await response.json();
        show = `
        <h4>Account: ${address}</h4>
        <h4>Date: ${date}</h4>
        <h4>tokens: ${tokens} ETH</h4>
        `
    } else {
        show = `
        <h2>Looks like your request didn't pass through. Please check that you entered valid address and try again.</h2>
        `
    }
    $('#loader-tokens').addClass('hide-load');
    resultDivTokens.innerHTML = show;
});

formTransactions.addEventListener('submit', async (event) => {
    event.preventDefault();
    const testA = $("#wallet-address").val();
    const testB = $("#starting-block").val();
    $("#loader").removeClass('hide-load');
    const formData = new FormData(formTransactions);
    const response = await fetch(`transactions?wallet=${testA}&block=${testB}`, {
        method: 'get',
    });
    let table;
    if (response.ok) {
        table = `
      <div class="row">
        <div class="col-md-offset-1 col-md-10">
            <div class="panel">
                <div class="panel-body table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>FROM</th>
                                <th>TO</th>
                                <th>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody id="table-result"></tbody>
                    </table>
                  </div>
              </div>
            </div>
          </div>
      `;
    } else {
        table = `
        <div class="error">
          <h1>Block Range Error</h1>
          <h2>Query returned more than 10000 results. Please try with again with smaller block range</h2>
        </div>`;
        $('#loader').addClass('hide-load');
    }
    resultDivTransactions.innerHTML = table;
    const resultTable = document.getElementById('table-result');
    const result = await response.json();
    const resultHtml = result
        .map(
            (transaction) => `
                <tr>
                    <td>${transaction.from}</td>
                    <td>${transaction.to}</td>
                    <td>${transaction.valueEth} ETH</td>
                </tr>
          `
        )
        .join('');
    $('#loader').addClass('hide-load');
    resultTable.innerHTML = resultHtml;
    $('table').DataTable({
        scrollY: false,
        info: false,
    });
    $("#wallet-address").val('');
    $("#starting-block").val('');
});