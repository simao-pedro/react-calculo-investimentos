import React from 'react';

export default function App() {
  const [capitalInicial, setCapitalInicial] = React.useState(0);
  const [taxaJurosMensal, setTaxaJurosMensal] = React.useState(0);
  const [periodoMeses, setPeriodoMeses] = React.useState(0);
  const [parcelas, setParcelas] = React.useState([]);

  const handleCapitalInicial = ({ target }) => {
    setCapitalInicial(target.value);
  };

  const handletaxaJurosMensal = ({ target }) => {
    setTaxaJurosMensal(target.value);
  };

  const handlePeriodoMeses = ({ target }) => {
    setPeriodoMeses(target.value);
  };

  React.useEffect(() => {
    const auxParcelas = [];
    let auxParcela = {};
    let auxBaseParcela = 0;
    let auxValorParcela = 0;
    let auxLucro = 0;
    let auxPorcentagemLucro = 0;

    for (let i = 0; i < periodoMeses; i++) {
      auxBaseParcela =
        i == 0 ? Number(capitalInicial) : auxParcelas[i - 1].valorParcela;

      auxValorParcela =
        auxBaseParcela + (auxBaseParcela * Number(taxaJurosMensal)) / 100;

      auxLucro = auxValorParcela - Number(capitalInicial);

      auxPorcentagemLucro = (auxLucro / Number(capitalInicial)) * 100;

      auxParcela = {
        valorParcela: auxValorParcela,
        lucro: auxLucro,
        porcentagem: auxPorcentagemLucro,
        parcela: i + 1,
      };
      auxParcelas.push(auxParcela);
    }
    setParcelas(auxParcelas);
  }, [capitalInicial, taxaJurosMensal, periodoMeses]);

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <div className="row">
        <div className="col s4 input-field">
          <input
            id="montanteInicial"
            type="number"
            value={capitalInicial}
            onChange={handleCapitalInicial}
            min="0"
          />
          <label htmlFor="montanteInicial" className="active">
            Montante Inicial
          </label>
        </div>
        <div className="col s4 input-field">
          <input
            id="taxaJurosMensal"
            type="number"
            value={taxaJurosMensal}
            onChange={handletaxaJurosMensal}
            step="0.1"
          />
          <label htmlFor="taxaJurosMensal" className="active">
            Taxa de juros mensal:
          </label>
        </div>
        <div className="col s4 input-field">
          <input
            id="periodoMeses"
            type="number"
            value={periodoMeses}
            onChange={handlePeriodoMeses}
            min="0"
          />
          <label htmlFor="periodoMeses" className="active">
            Período (meses):
          </label>
        </div>
      </div>

      <div className="row">
        {parcelas.map((parcela) => (
          <div className="col s2" key={parcela.parcela}>
            <div className="card d-flex align-items-center">
              <div>
                <p className="info-parcela">{parcela.parcela}</p>
              </div>
              <div>
                <p>{formatter.format(parcela.valorParcela)} </p>
                <p>{formatter.format(parcela.lucro)} </p>
                <p>{`${parcela.porcentagem.toFixed(2)}%`} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
