const regionA = ["MG"];
const regionB = ["SP"];
const regionC = ["RJ"];

$(document).ready(function () {
  $("#zipcode").mask("00000-000");

  $("#secondStep").attr("disabled", true).hide();
  $("#zipcode").on("keyup", function () {
    const ZIPCODE = this.value;
    if (ZIPCODE.length === 9) {
      const request = new Request(`https://viacep.com.br/ws/${ZIPCODE}/json/`);

      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("cep errado");
          }
        })
        .then((data) => {
          if (data["erro"]) alert("Formato de CEP inválido.");
          else {
            $("#stateForm").val(data["uf"]).change();
            localStorage.setItem("@LocationModal:state", data["uf"]);
            localStorage.setItem(
              "@LocationModal:lastUpdate",
              Date.now().toString()
            );
          }
        });
    } else {
      $("#secondStep").attr("disabled", true).hide();
    }
  });
  $("#stateForm").on("change", function () {
    const hasState = this.value !== "";
    if (!hasState) {
      $("#secondStep").hide();
    } else {
      $("#secondStep").show();
    }
  });

  $("#btnSucess").click(function (e) {
    e.preventDefault();

    checkRegion($("#stateForm").val());
    localStorage.setItem("@LocationModal:state", $("#stateForm").val());
    localStorage.setItem("@LocationModal:lastUpdate", Date.now().toString());
  });
});

const checkRegion = (state) => {
  if (regionA.includes(state)) {
    window.location.href = "/parceiros/regiao_1";
  } else if (regionC.includes(state)) {
    window.location.href = "/parceiros/regiao_3";
  } else {
    window.location.href = "/parceiros/regiao_2";
  }
};
