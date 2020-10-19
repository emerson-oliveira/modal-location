const regiao_1 = ['MG']
const regiao_2 = ['SP']
const regiao_3 = ['RJ']

$(document).ready(function() {
    $('input[name=\"zipcode\"]').mask("99999-999");

    $("#teste").attr("disabled", true).hide();
    $('input[name="zipcode"]').on('keyup', function() {
        let cepCodigo = this.value
        if(cepCodigo.length===9){
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
                    if(data['erro'])
                        alert("Formato de CEP inválido.");
                    else{
                        $("#teste").attr("disabled", false).show();

                        $('#stateForm').val(data['uf']);


                        console.log(cepCodigo[0],'posicao');
                        checa_regiao(data['uf']);
                    }

                });
        }
    });
    $("#stateForm").change(function () {
        checa_regiao(this.value)

    });
});


function checa_regiao(estado) {

    if(regiao_1.includes(estado)){
        console.log('regiao 1')
    }else if(regiao_2.includes(estado)){
        console.log('regiao 2')
    }else {
        console.log('regiao 3')
    }

}
