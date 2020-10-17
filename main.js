
$(document).ready(function() {

    $("#teste").attr("disabled", true);
    $("#teste").hide();
    $('input[name="zipcode"]').on('keyup', function() {
        if(this.value.length===8){
            const request = new Request('https://viacep.com.br/ws/'+this.value+'/json/');

            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('cep errado');
                    }
                })
                .then(data => {
                    $("#teste").attr("disabled", false);
                    $("#teste").show();
                    $('#stateForm').val(data['uf']);
                    console.log(data['uf']);
                });
        }
    });
});
