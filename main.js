const regiao_1 = ['MG']
const regiao_2 = ['SP']
const regiao_3 = ['RJ']

$(document).ready(function() {
    $('input[name="zipcode"]').mask('00000-000');

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
                        $('#stateForm').val(data['uf']).change();
                        console.log(cepCodigo[0],'posicao');
                    }
                });
        }
    });
    $('select#stateForm').on('change', function(){
        if($('select#stateForm').val() == ''){
            $('#teste').hide()
        }else{
            $('#teste').show()
        }
    })
        
    $('#page-location .btn-sucess').click(function(e){
        e.preventDefault();
        
        checa_regiao($('select#stateForm').val());
    })
});


function checa_regiao(estado) {

    if(regiao_1.includes(estado)){
        console.log('regiao 1')
        window.location.href = "/parceiros/regiao_1";
    }else if(regiao_2.includes(estado)){
        console.log('regiao 2')
        window.location.href = "/parceiros/regiao_2";
    }else if(regiao_3.includes(estado)){
        console.log('regiao 3')
        window.location.href = "/parceiros/regiao_3";
    }
}