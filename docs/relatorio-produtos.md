# Relatório de Auditoria e Normalização da Relação de Produtos e Preços

> **Data de geração:** 2026-10-30  
> **Base de dados:** `src/data/produtos.json` (derivado de `src/data/produtos-raw.txt`)  
> **Total de itens:** 312  
> **Total de variantes de embalagem/preço:** 314  
> **Data de atualização da relação na origem:** 2026-08-30  

---

## 8.1 Inconsistências de dados encontradas (confirmar com o cliente)

As seguintes inconsistências de digitação e formatação foram identificadas no arquivo de origem bruto (`produtos-raw.txt`). Em respeito à regra de ouro do projeto, **nenhum dado foi alterado ou corrigido arbitrariamente no site**. As decisões cabem exclusivamente ao cliente:

1. **`ÁCIDO ACÉTICO GLACIAL NA CONCENTRAÇÃO DE 30%` (Linha 15, 1 L, R$ 99,00):**  
   O termo "glacial" na química industrial e analítica designa especificamente a forma anidra/pura (~99,8%). A concentração de 30% é incompatível com o estado glacial. **Confirmar se o produto é Ácido Acético 30% ou Ácido Acético Glacial 99,8%.**

2. **`GLICINA PA ACS (ÁCIDO AMINO ACÉTICO) 250ml` (Linha 192, R$ 99,00):**  
   A glicina é um aminoácido sólido cristalino à temperatura ambiente, rotineiramente comercializado em gramas (g). No arquivo bruto está cotado em `250ml`. **Confirmar se a embalagem correta é 250 g.**

3. **`MOLIBDATO DE "AMONEO" (4H2O)` (Linha 231, 50 g, R$ 129,00):**  
   Grafia no texto bruto: "AMONEO". Trata-se de provável erro de digitação para "amônio". Conforme regra de ouro, o dicionário mecânico **não** alterou essa palavra, preservando o nome original até confirmação do cliente.

4. **Preços sem prefixo "R$" ou com formatação atípica na origem:**  
   - Linha 16 (`ÁCIDO ACÉTICO GLACIAL P.A ACS 99,8%`): cotado como `$129,00` (sem o "R").  
   - Linha 264 (`PERCLORATO DE POTÁSSIO P.A`): cotado como `299,00` (sem "R$").  
   - Linha 291 (`SULFATO DE SODIO ANIDRO PA ACS`): sem os três asteriscos de separador (`500grsR$ 49,00`).  
   *Nota técnica:* Todos os valores numéricos foram extraídos com precisão e conferidos.

5. **`4'METIL PROPIOFENONA` (Linha 228, 200 mL, R$ 299,00):**  
   Havia um espaço em branco inicial na linha de origem. O espaço foi removido mecanicamente sem afetar a nomenclatura.

6. **17 itens sem indicação de grau químico na fonte:**  
   Os seguintes itens não possuem especificação de pureza (P.A., P.S., Puro, USP, etc.) no texto de origem:
   - **Linha 15:** `Ácido acético glacial na concentração de 30%` (1 L)
   - **Linha 54:** `Alaranjado de metila 1% solução` (200 mL)
   - **Linha 71:** `Alumínio em po` (250 g)
   - **Linha 81:** `Azul de toluidina solução 1% aquosa` (500 mL)
   - **Linha 86:** `Bifluoreto de amônio` (250 g)
   - **Linha 99:** `Cafeína anidra (grau alimentício)` (100 g)
   - **Linha 128:** `Cloreto de ferro III (ico) anidro` (100 g)
   - **Linha 144:** `Cobre em po` (100 g)
   - **Linha 146:** `DDQ (dicloro-2,3 diciano-5,6 benzoquinona)` (100 g)
   - **Linha 193:** `Glicina etil éster (cloridrato)` (100 g)
   - **Linha 223:** `Magnésio em aparas` (100 g)
   - **Linha 224:** `Mercúrio metálico` (10 g)
   - **Linha 228:** `4'metil propiofenona` (200 mL)
   - **Linha 235:** `Níquel em po` (50 g)
   - **Linha 240:** `Nitrato de manganês III (sol. 50%)` (250 mL)
   - **Linha 262:** `Percarbonato de sódio` (100 g)
   - **Linha 289:** `Sulfato de magnésio anidro` (250 g)

---

## 8.2 Pontos jurídicos e comerciais a validar antes de publicar

Antes da publicação em produção no domínio oficial, os seguintes pontos devem ser validados formalmente pelo setor jurídico e comercial do cliente:

1. **Produtos Químicos Sujeitos a Controle Legal:**  
   A relação inclui reagentes de controle especial (Polícia Federal, Exército Brasileiro e/ou ANVISA), tais como solventes controlados, precursores, oxidantes e ácidos concentrados (ex.: ácido sulfúrico, ácido clorídrico, permanganato de potássio, éter etílico, acetona, cloroformio, anidrido acético, etc.).  
   - *Ação requerida:* O cliente deve fornecer a lista oficial de quais produtos exigem Certificado de Registro / Licença de Funcionamento para que o campo reservado `controlado` seja preenchido e as instruções legais sejam adequadamente exibidas. **Nenhum produto foi marcado como controlado por inferência da equipe de desenvolvimento.**

2. **Citação nominal de fornecedores e marcas:**  
   O texto institucional da página menciona nominalmente "grandes fornecedores nacionais, tais como Neon, Dinâmica Química, Êxodo Científica, Merck e Sigma Aldrich".  
   - *Ação requerida:* Confirmar com o jurídico se há autorização contratual para o uso dessas marcas comerciais no site público da empresa.

3. **Afirmação "mais de 10 mil reagentes":**  
   O texto afirma que a empresa trabalha com "mais de 10 mil reagentes químicos".  
   - *Ação requerida:* Confirmar a veracidade comercial da alegação perante as diretrizes do Código de Defesa do Consumidor.

4. **Menção a "juros baixos cobrados pelo Mercado Pago":**  
   O bloco "Como comprar" afirma "parcelado em até 12x com juros baixos cobrados pelo Mercado Pago".  
   - *Ação requerida:* O adjetivo "baixos" é subjetivo e pode ser questionado. Recomenda-se confirmar se o termo pode permanecer ou se deve ser ajustado para "juros da operadora Mercado Pago".

5. **Vigência da relação de preços (Data: 30/08/2026):**  
   A data constante na relação oficial é de **30/08/2026**. Se essa data tiver mais de 60 dias da data de publicação efetiva, o cliente deve confirmar se os valores permanecem vigentes ou enviar relação atualizada.

6. **Política de Privacidade e LGPD no canal WhatsApp:**  
   Como todas as compras e cotações são direcionadas para o WhatsApp, é fundamental disponibilizar a Política de Privacidade informando a finalidade do tratamento de dados cadastrais e fiscais coletados durante o atendimento.

---

## 8.3 Relatório de Normalização Mecânica

### Palavras acentuadas via dicionário determinístico (`scripts/acentos.json`)
Total de termos acentuados identificados no catálogo: **92**

| Termo sem acento (origem) | Termo acentuado aplicado |
|---|---|
| `acetaldeido` | **`acetaldeído`** |
| `acetico` | **`acético`** |
| `acido` | **`ácido`** |
| `acrilico` | **`acrílico`** |
| `alcool` | **`álcool`** |
| `aldeido` | **`aldeído`** |
| `alimenticio` | **`alimentício`** |
| `alumen` | **`alúmen`** |
| `aluminio` | **`alumínio`** |
| `aminobutirico` | **`aminobutírico`** |
| `amonio` | **`amônio`** |
| `anisaldeido` | **`anisaldeído`** |
| `anisico` | **`anísico`** |
| `antimonio` | **`antimônio`** |
| `antranilico` | **`antranílico`** |
| `ascorbico` | **`ascórbico`** |
| `bario` | **`bário`** |
| `benzaldeido` | **`benzaldeído`** |
| `benzilico` | **`benzílico`** |
| `borico` | **`bórico`** |
| `bromidrico` | **`bromídrico`** |
| `butilico` | **`butílico`** |
| `cafeina` | **`cafeína`** |
| `calcio` | **`cálcio`** |
| `cianurico` | **`cianúrico`** |
| `cinamaldeido` | **`cinamaldeído`** |
| `cinamico` | **`cinâmico`** |
| `cinamilico` | **`cinamílico`** |
| `citrico` | **`cítrico`** |
| `cloridrico` | **`clorídrico`** |
| `cloroacetico` | **`cloroacético`** |
| `cloroformio` | **`clorofórmio`** |
| `cromico` | **`crômico`** |
| `diatomacea` | **`diatomácea`** |
| `dibasico` | **`dibásico`** |
| `dioxido` | **`dióxido`** |
| `estearico` | **`esteárico`** |
| `ester` | **`éster`** |
| `estroncio` | **`estrôncio`** |
| `eter` | **`éter`** |
| `etilico` | **`etílico`** |
| `fenico` | **`fênico`** |
| `fenilacetaldeido` | **`fenilacetaldeído`** |
| `fenolftaleina` | **`fenolftaleína`** |
| `formaldeido` | **`formaldeído`** |
| `formico` | **`fórmico`** |
| `fosforico` | **`fosfórico`** |
| `fosforo` | **`fósforo`** |
| `ftalico` | **`ftálico`** |
| `furfuraldeido` | **`furfuraldeído`** |
| `glioxilico` | **`glioxílico`** |
| `hidrogenio` | **`hidrogênio`** |
| `hidroxido` | **`hidróxido`** |
| `isomeros` | **`isômeros`** |
| `lactico` | **`láctico`** |
| `litio` | **`lítio`** |
| `magnesio` | **`magnésio`** |
| `mandelico` | **`mandélico`** |
| `manganes` | **`manganês`** |
| `mercurio` | **`mercúrio`** |
| `metalico` | **`metálico`** |
| `microperolas` | **`micropérolas`** |
| `monobasico` | **`monobásico`** |
| `nicotinico` | **`nicotínico`** |
| `niquel` | **`níquel`** |
| `nitrico` | **`nítrico`** |
| `octilico` | **`octílico`** |
| `oxalico` | **`oxálico`** |
| `oxido` | **`óxido`** |
| `paraformaldeido` | **`paraformaldeído`** |
| `pentoxido` | **`pentóxido`** |
| `perclorico` | **`perclórico`** |
| `peroxido` | **`peróxido`** |
| `potassio` | **`potássio`** |
| `propionico` | **`propiônico`** |
| `quaternario` | **`quaternário`** |
| `salicilico` | **`salicílico`** |
| `sodica` | **`sódica`** |
| `sodio` | **`sódio`** |
| `solucao` | **`solução`** |
| `succinico` | **`succínico`** |
| `sulfamico` | **`sulfâmico`** |
| `sulfanilico` | **`sulfanílico`** |
| `sulfurico` | **`sulfúrico`** |
| `tartarico` | **`tartárico`** |
| `tecnico` | **`técnico`** |
| `tioglicolico` | **`tioglicólico`** |
| `tribasico` | **`tribásico`** |
| `tricloroacetico` | **`tricloroacético`** |
| `trifluoracetico` | **`trifluoracético`** |
| `trioxido` | **`trióxido`** |
| `vanadio` | **`vanádio`** |

### Lista completa de transformação de nomes (312 itens)

| Linha | Nome Bruto na Fonte | Nome Exibido no Site | Grau | Embalagem e Preço |
|---|---|---|---|---|
| 1 | `ACETALDEIDO (ALDEIDO ACETICO) P.A 50ml***R$ 129,00` | **Acetaldeído (aldeído acético)** | P.A. | 50 mL (R$ 129,00) |
| 2 | `ACETAMIDA P.A 100grs***R$ 129,00` | **Acetamida** | P.A. | 100 g (R$ 129,00) |
| 3 | `ACETATO DE AMONIO P.A 250grs***R$ 99,00` | **Acetato de amônio** | P.A. | 250 g (R$ 99,00) |
| 4 | `ACETATO DE BUTILA P.A 200ml***R$ 59,00` | **Acetato de butila** | P.A. | 200 mL (R$ 59,00) |
| 5 | `ACETATO DE CALCIO P.A 250grs***R$ 69,00` | **Acetato de cálcio** | P.A. | 250 g (R$ 69,00) |
| 6 | `ACETATO DE CHUMBO NEUTRO (3H2O) PA 250grs***R$ 99,00` | **Acetato de chumbo neutro (3H2O)** | P.A. | 250 g (R$ 99,00) |
| 7 | `ACETATO DE COBRE II PA ACS(1 H2O) 250grs***R$ 99,00` | **Acetato de cobre II PA ACS(1 H2O)** | P.A. ACS | 250 g (R$ 99,00) |
| 8 | `ACETATO DE ETILA P.A ACS 1 Litro***R$ 129,00` | **Acetato de etila** | P.A. ACS | 1 L (R$ 129,00) |
| 9 | `ACETATO DE NIQUEL II P.A (4 H2O) 100grs***R$ 99,00` | **Acetato de níquel II P.A (4 H2O)** | P.A. | 100 g (R$ 99,00) |
| 10 | `ACETATO DE SODIO ANIDRO PA ACS 250grs***R$ 49,00` | **Acetato de sódio anidro** | P.A. ACS | 250 g (R$ 49,00) |
| 11 | `ACETOACETATO DE ETILA P.A 250ml***R$ 119,00` | **Acetoacetato de etila** | P.A. | 250 mL (R$ 119,00) |
| 12 | `ACETOFENONA PS 100ml***R$ 119,00` | **Acetofenona** | P.S. | 100 mL (R$ 119,00) |
| 13 | `ACETONA P.A ACS 1 Litro***R$ 129,00` | **Acetona** | P.A. ACS | 1 L (R$ 129,00) |
| 14 | `ACETONITRILA P.A ACS 1 Litro***R$ 199,00` | **Acetonitrila** | P.A. ACS | 1 L (R$ 199,00) |
| 15 | `ACIDO ACETICO GLACIAL NA CONCENTRAÇÃO DE 30% 01 LITRO*** R$ 99,00` | **Ácido acético glacial na concentração de 30%** | — | 1 L (R$ 99,00) |
| 16 | `ACIDO ACETICO GLACIAL P.A ACS 99,8% 500ML*** $129,00` | **Ácido acético glacial P.A ACS 99,8%** | P.A. ACS | 500 mL (R$ 129,00) |
| 17 | `ACIDO ACRILICO P.A 200ml***R$ 99,00` | **Ácido acrílico** | P.A. | 200 mL (R$ 99,00) |
| 18 | `ACIDO 2-AMINO BENZOICO (ANTRANILICO) puro 50grs*** R$249,00` | **Ácido 2-amino benzoico (antranílico)** | Puro | 50 g (R$ 249,00) |
| 19 | `ACIDO L(+) ASCORBICO PA (VITAMINA C) 250grs***R$ 99,00` | **Ácido l(+) ascórbico PA (vitamina c)** | P.A. | 250 g (R$ 99,00) |
| 20 | `ACIDO BENZOICO P.A 250grs***R$ 129,00` | **Ácido benzoico** | P.A. | 250 g (R$ 129,00) |
| 21 | `ACIDO BORICO P.A ACS 250grs***R$ 89,00` | **Ácido bórico** | P.A. ACS | 250 g (R$ 89,00) |
| 22 | `ACIDO BROMIDRICO 48% PA ACS 500ml***R$ 249,00` | **Ácido bromídrico 48%** | P.A. ACS | 500 mL (R$ 249,00) |
| 23 | `ACIDO CITRICO P.A ACS 500grs***R$ 79,00` | **Ácido cítrico** | P.A. ACS | 500 g (R$ 79,00) |
| 24 | `ACIDO CLORIDRICO GRAU TECNICO 30-33% 500ml***R$ 99,00` | **Ácido clorídrico grau técnico 30-33%** | Grau técnico | 500 mL (R$ 99,00) |
| 25 | `ACIDO CLORIDRICO P.A ACS 37,5% 500ml***    R$119,00` | **Ácido clorídrico P.A ACS 37,5%** | P.A. ACS | 500 mL (R$ 119,00) |
| 26 | `ACIDO CLOROACETICO P.A ACS 500grs***R$99,00` | **Ácido cloroacético** | P.A. ACS | 500 g (R$ 99,00) |
| 27 | `ACIDO ESTEARICO P.A 250grs***R$ 59,00` | **Ácido esteárico** | P.A. | 250 g (R$ 59,00) |
| 28 | `ACIDO FORMICO 85% PA ACS 500ml***R$ 129,00` | **Ácido fórmico 85%** | P.A. ACS | 500 mL (R$ 129,00) |
| 29 | `ACIDO FOSFORICO 85% PA ACS 500ml***R$ 79,00` | **Ácido fosfórico 85%** | P.A. ACS | 500 mL (R$ 79,00) |
| 30 | `ACIDO GAMA AMINOBUTIRICO Grau USP 100grs***R$ 59,00` | **Ácido gama aminobutírico** | Grau USP | 100 g (R$ 59,00) |
| 31 | `ÁCIDO GLIOXILICO P.S 500ml***R$ 99,00` | **Ácido glioxílico** | P.S. | 500 mL (R$ 99,00) |
| 32 | `ÁCIDO HIPOFOSFOROSO 50% P.A 200ml***R$ 199,00` | **Ácido hipofosforoso 50%** | P.A. | 200 mL (R$ 199,00) |
| 33 | `ÁCIDO LACTICO 85% PA ACS 200ml***R$ 49,00` | **Ácido láctico 85%** | P.A. ACS | 200 mL (R$ 49,00) |
| 34 | `ACIDO MANDELICO P.A 100grs***R$ 199,00` | **Ácido mandélico** | P.A. | 100 g (R$ 199,00) |
| 35 | `ACIDO NICOTINICO P.A 100grs***R$ 79,00` | **Ácido nicotínico** | P.A. | 100 g (R$ 79,00) |
| 36 | `ACIDO NITRICO 65% PA ACS 500ml***R$ 119,00` | **Ácido nítrico 65%** | P.A. ACS | 500 mL (R$ 119,00) |
| 37 | `ACIDO NITRICO 65% PA ACS 01 LITRO***R$ 238,00` | **Ácido nítrico 65%** | P.A. ACS | 1 L (R$ 238,00) |
| 38 | `ACIDO OXALICO CRISTAL (2H2O) PA ACS 100grs***R$ 49,00` | **Ácido oxálico cristal (2H2O)** | P.A. ACS | 100 g (R$ 49,00) |
| 39 | `ACIDO PARA AMINOBENZOICO P.A 25grs***R$ 79,00` | **Ácido para aminobenzoico** | P.A. | 25 g (R$ 79,00) |
| 40 | `ACIDO PERCLORICO 70% PA ACS 500ml***R$ 799,00` | **Ácido perclórico 70%** | P.A. ACS | 500 mL (R$ 799,00) |
| 41 | `ACIDO PROPIONICO P.A ACS 200ml***R$ 79,00` | **Ácido propiônico** | P.A. ACS | 200 mL (R$ 79,00) |
| 42 | `ACIDO SALICILICO P.A ACS 200grs***R$ 99,00` | **Ácido salicílico** | P.A. ACS | 200 g (R$ 99,00) |
| 43 | `ACIDO SUCCINICO P.A 250 grs***R$ 79,00` | **Ácido succínico** | P.A. | 250 g (R$ 79,00) |
| 44 | `ACIDO SULFAMICO P.A ACS 250grs***R$ 49,00` | **Ácido sulfâmico** | P.A. ACS | 250 g (R$ 49,00) |
| 45 | `ACIDO SULFANILICO P.A 250grs***R$ 79,00` | **Ácido sulfanílico** | P.A. | 250 g (R$ 79,00) |
| 46 | `ACIDO SULFURICO P.URO 98% 500ml***R$ 99,00` | **Ácido sulfúrico p.uro 98%** | Puro | 500 mL (R$ 99,00) |
| 47 | `ACIDO SULFURICO P.URO 98% 01 LITRO***R$ 179,00` | **Ácido sulfúrico p.uro 98%** | Puro | 1 L (R$ 179,00) |
| 48 | `ACIDO TARTARICO - L (+) P.A ACS 250grs***R$ 49,00` | **Ácido tartárico - l (+)** | P.A. ACS | 250 g (R$ 49,00) |
| 49 | `ACIDO TIOGLICOLICO PS 200ml***R$ 79,00` | **Ácido tioglicólico** | P.S. | 200 mL (R$ 79,00) |
| 50 | `ÁCIDO TRICLOROACETICO P.A ACS 250grs***R$ 99,00` | **Ácido tricloroacético** | P.A. ACS | 250 g (R$ 99,00) |
| 51 | `ACIDO TRIFLUORACETICO P.A 50ml***R$ 119,00` | **Ácido trifluoracético** | P.A. | 50 mL (R$ 119,00) |
| 52 | `ADRENALINA (EPINEFRINA CLORIDRATO) Grau USP 05grs***R$ 249,00` | **Adrenalina (epinefrina cloridrato)** | Grau USP | 5 g (R$ 249,00) |
| 53 | `ALANINA (L) P.A 100grs***R$ 69,00` | **Alanina (l)** | P.A. | 100 g (R$ 69,00) |
| 54 | `ALARANJADO DE METILA 1% SOLUÇÃO 200ml***R$ 49,00` | **Alaranjado de metila 1% solução** | — | 200 mL (R$ 49,00) |
| 55 | `ALCOOL BENZILICO P.A ACS 200ml***R$ 49,00` | **Álcool benzílico** | P.A. ACS | 200 mL (R$ 49,00) |
| 56 | `ALCOOL BUTILICO P.A ACS 200ml***R$ 49,00` | **Álcool butílico** | P.A. ACS | 200 mL (R$ 49,00) |
| 57 | `ALCOOL CINAMILICO P.A 100ml***R$ 199,00` | **Álcool cinamílico** | P.A. | 100 mL (R$ 199,00) |
| 58 | `ALCOOL ETILICO ABSOLUTO 99,5% P.A ACS 1 Litro***R$ 49,00` | **Álcool etílico absoluto 99,5%** | P.A. ACS | 1 L (R$ 49,00) |
| 59 | `ALCOOL FENIL ETILICO P.A 100ml***R$ 79,00` | **Álcool fenil etílico** | P.A. | 100 mL (R$ 79,00) |
| 60 | `ALCOOL ISOAMILICO P.A ACS 500ml***R$ 69,00` | **Álcool isoamilico** | P.A. ACS | 500 mL (R$ 69,00) |
| 61 | `ALCOOL ISOBUTILICO P.A ACS 500ml***R$ 49,00` | **Álcool isobutilico** | P.A. ACS | 500 mL (R$ 49,00) |
| 62 | `ALCOOL ISOPROPILICO P.A ACS 500ml***R$ 49,00` | **Álcool isopropilico** | P.A. ACS | 500 mL (R$ 49,00) |
| 63 | `ALCOOL METILICO P.A ACS 500ml***R$ 49,00` | **Álcool metilico** | P.A. ACS | 500 mL (R$ 49,00) |
| 64 | `ALCOOL N PROPILICO P.A ACS 500ml***R$ 49,00` | **Álcool n propilico** | P.A. ACS | 500 mL (R$ 49,00) |
| 65 | `ALCOOL OCTILICO P.A 500ml***R$ 49,00` | **Álcool octílico** | P.A. | 500 mL (R$ 49,00) |
| 66 | `ALCOOL POLIVINILICO PS 500grs***R$ 79,00` | **Álcool polivinilico** | P.S. | 500 g (R$ 79,00) |
| 67 | `ALCOOL SEC BUTILICO P.A 500ml***R$ 119,00` | **Álcool sec butílico** | P.A. | 500 mL (R$ 119,00) |
| 68 | `ALCOOL TERC BUTÍLICO P.A ACS 500ml***R$ 99,00` | **Álcool terc butílico** | P.A. ACS | 500 mL (R$ 99,00) |
| 69 | `ALDEIDO ANISICO (ANISALDEIDO) P.A 100ml***R$ 49,00` | **Aldeído anísico (anisaldeído)** | P.A. | 100 mL (R$ 49,00) |
| 70 | `ALDEÍDO BENZOICO (BENZALDEIDO) P.A 200ml***R$ 89,00` | **Aldeído benzoico (benzaldeído)** | P.A. | 200 mL (R$ 89,00) |
| 71 | `ALUMINIO EM PO 250grs***R$ 99,00` | **Alumínio em po** | — | 250 g (R$ 99,00) |
| 72 | `AMISSULPRIDA grau USP 50grs***R$ 119,00` | **Amissulprida** | Grau USP | 50 g (R$ 119,00) |
| 73 | `ANIDRIDO ACETICO P.A ACS 500ml***R$ 99,00` | **Anidrido acético** | P.A. ACS | 500 mL (R$ 99,00) |
| 74 | `ANIDRIDO CROMICO VI PA 250grs***R$ 79,00` | **Anidrido crômico VI** | P.A. | 250 g (R$ 79,00) |
| 75 | `ANIDRIDO FTALICO PS 500grs***R$ 79,00` | **Anidrido ftálico** | P.S. | 500 g (R$ 79,00) |
| 76 | `ANILINA P.A ACS 200ml***R$ 99,00` | **Anilina** | P.A. ACS | 200 mL (R$ 99,00) |
| 77 | `ANTRANILATO DE METILA P.A 100ml***R$ 99,00` | **Antranilato de metila** | P.A. | 100 mL (R$ 99,00) |
| 78 | `AZIDA DE SODIO P.A ACS 100grs***R$ 249,00` | **Azida de sódio** | P.A. ACS | 100 g (R$ 249,00) |
| 79 | `AZUL DE BROMOTIMOL P.A ACS 5grs***R$ 49,00` | **Azul de bromotimol** | P.A. ACS | 5 g (R$ 49,00) |
| 80 | `AZUL DE METILENO P.A 25grs***R$ 79,00` | **Azul de metileno** | P.A. | 25 g (R$ 79,00) |
| 81 | `AZUL DE TOLUIDINA SOLUÇÃO 1% AQUOSA 500ml***R$ 59,00` | **Azul de toluidina solução 1% aquosa** | — | 500 mL (R$ 59,00) |
| 82 | `BENZENO P.A ACS 50ml***R$ 99,00` | **Benzeno** | P.A. ACS | 50 mL (R$ 99,00) |
| 83 | `BENZOATO DE SODIO P.A 500grs***R$ 49,00` | **Benzoato de sódio** | P.A. | 500 g (R$ 49,00) |
| 84 | `BENZOFENONA PS  100ml***R$ 69,00` | **Benzofenona** | P.S. | 100 mL (R$ 69,00) |
| 85 | `BICARBONATO DE SODIO P.A ACS 500grs***R$ 49,00` | **Bicarbonato de sódio** | P.A. ACS | 500 g (R$ 49,00) |
| 86 | `BIFLUORETO DE AMÔNIO 250grs***R$129,00` | **Bifluoreto de amônio** | — | 250 g (R$ 129,00) |
| 87 | `BISSULFATO DE POTASSIO P.A 250grs***R$ 159,00` | **Bissulfato de potássio** | P.A. | 250 g (R$ 159,00) |
| 88 | `BISSULFITO DE SODIO P.A ACS 500grs***R$ 49,00` | **Bissulfito de sódio** | P.A. ACS | 500 g (R$ 49,00) |
| 89 | `BOROHIDRETO DE SODIO (HIDRETO DE SÓDIO E BORO) PS 50grs***R$ 249,00` | **Borohidreto de sódio (hidreto de sódio e boro)** | P.S. | 50 g (R$ 249,00) |
| 90 | `BROMATO DE POTASSIO P.A ACS 100grs***R$ 159,00` | **Bromato de potássio** | P.A. ACS | 100 g (R$ 159,00) |
| 91 | `BROMETO DE AMONIO P.A ACS 250grs***R$ 69,00` | **Brometo de amônio** | P.A. ACS | 250 g (R$ 69,00) |
| 92 | `BROMETO DE COBRE II P.A 100grs***R$ 199,00` | **Brometo de cobre II** | P.A. | 100 g (R$ 199,00) |
| 93 | `BROMETO DE ETILA P.A 100ml***R$ 199,00` | **Brometo de etila** | P.A. | 100 mL (R$ 199,00) |
| 94 | `BROMETO DE POTASSIO P.A ACS 250grs***R$ 199,00` | **Brometo de potássio** | P.A. ACS | 250 g (R$ 199,00) |
| 95 | `BROMETO DE SÓDIO P.A ACS 250grs***R$ 99,00` | **Brometo de sódio** | P.A. ACS | 250 g (R$ 99,00) |
| 96 | `BROMO PENTANO P.A 200ml***R$ 199,00` | **Bromo pentano** | P.A. | 200 mL (R$ 199,00) |
| 97 | `BUTANODIOL 1,4 PS 200ml***     R$ 99,00` | **Butanodiol 1,4** | P.S. | 200 mL (R$ 99,00) |
| 98 | `BUTAMBEN (PARA AMINO BENZOATO DE BUTILA) Grau USP 100grs***R$ 129,00` | **Butamben (para amino benzoato de butila)** | Grau USP | 100 g (R$ 129,00) |
| 99 | `CAFEINA ANIDRA (GRAU ALIMENTÍCIO) 100grs***R$199,00` | **Cafeína anidra (grau alimentício)** | — | 100 g (R$ 199,00) |
| 100 | `CARBONATO DE AMONIO P.A ACS 250grs***R$ 49,00` | **Carbonato de amônio** | P.A. ACS | 250 g (R$ 49,00) |
| 101 | `CARBONATO DE ESTRONCIO P.A 100grs***R$ 99,00` | **Carbonato de estrôncio** | P.A. | 100 g (R$ 99,00) |
| 102 | `CARBONATO DE POTASSIO ANIDRO P.A ACS 500grs***R$ 99,00` | **Carbonato de potássio anidro** | P.A. ACS | 500 g (R$ 99,00) |
| 103 | `CARBONATO DE SODIO ANIDRO P.A ACS 500grs***R$ 59,00` | **Carbonato de sódio anidro** | P.A. ACS | 500 g (R$ 59,00) |
| 104 | `CATECOL P.A 50grs***R$ 89,00` | **Catecol** | P.A. | 50 g (R$ 89,00) |
| 105 | `CELITE 545 (TERRA DIATOMACEA) P.A 250grs***R$ 59,00` | **Celite 545 (terra diatomácea)** | P.A. | 250 g (R$ 59,00) |
| 106 | `CIANETO DE BENZILA (FENIL ACETONITRILA) P.A 100ml***R$ 349,00` | **Cianeto de benzila (fenil acetonitrila)** | P.A. | 100 mL (R$ 349,00) |
| 107 | `CIANETO DE COBRE P.A 250grs***R$ 129,00` | **Cianeto de cobre** | P.A. | 250 g (R$ 129,00) |
| 108 | `CIANETO DE ZINCO P.A ACS 100grs***R$ 129,00` | **Cianeto de zinco** | P.A. ACS | 100 g (R$ 129,00) |
| 109 | `CICLOHEXANOL PS 500ml*** R$ 259,00` | **Ciclohexanol** | P.S. | 500 mL (R$ 259,00) |
| 110 | `CICLOHEXANONA P.A ACS 500ml***R$ 129,00` | **Ciclohexanona** | P.A. ACS | 500 mL (R$ 129,00) |
| 111 | `CICLOHEXILAMINA P.A 200ml***R$ 69,00` | **Ciclohexilamina** | P.A. | 200 mL (R$ 69,00) |
| 112 | `CINAMALDEIDO (ALDEIDO CINAMICO) P.A 200ml***R$ 99,00` | **Cinamaldeído (aldeído cinâmico)** | P.A. | 200 mL (R$ 99,00) |
| 113 | `CITRATO DE AMONIO DIBASICO PA ACS 250grs***R$ 89,00` | **Citrato de amônio dibásico** | P.A. ACS | 250 g (R$ 89,00) |
| 114 | `CITRATO DE FERRO III AMONIACAL P.A 250grs***R$ 129,00` | **Citrato de ferro III amoniacal** | P.A. | 250 g (R$ 129,00) |
| 115 | `CLORATO DE SODIO P.A 250grs***R$ 79,00` | **Clorato de sódio** | P.A. | 250 g (R$ 79,00) |
| 116 | `CLORETO CIANURICO P.A ACS 100grs***R$ 129,00` | **Cloreto cianúrico** | P.A. ACS | 100 g (R$ 129,00) |
| 117 | `CLORETO DE ALILA (PROPENILA) P.A ACS 200ml***R$ 199,00` | **Cloreto de alila (propenila)** | P.A. ACS | 200 mL (R$ 199,00) |
| 118 | `CLORETO DE ALUMINIO ANIDRO P.A ACS 100grs***R$ 129,00` | **Cloreto de alumínio anidro** | P.A. ACS | 100 g (R$ 129,00) |
| 119 | `CLORETO DE AMONIO P.A ACS 250grs***R$ 89,00` | **Cloreto de amônio** | P.A. ACS | 250 g (R$ 89,00) |
| 120 | `CLORETO DE BARIO (2H2O) PA ACS 250grs***R$ 49,00` | **Cloreto de bário (2H2O)** | P.A. ACS | 250 g (R$ 49,00) |
| 121 | `CLORETO DE BENZOILA PS 200ml***    R$ 99,00` | **Cloreto de benzoila** | P.S. | 200 mL (R$ 99,00) |
| 122 | `CLORETO DE CALCIO ANIDRO P.A 500grs***R$ 49,00` | **Cloreto de cálcio anidro** | P.A. | 500 g (R$ 49,00) |
| 123 | `CLORETO DE CETIL TRIMETIL AMONIO (QUATERNARIO) P.A 500ml***R$ 99,00` | **Cloreto de cetil trimetil amônio (quaternário)** | P.A. | 500 mL (R$ 99,00) |
| 124 | `CLORETO DE COBALTO II OSO (6H2O) PA ACS 50grs***R$ 69,00` | **Cloreto de cobalto II oso (6H2O)** | P.A. ACS | 50 g (R$ 69,00) |
| 125 | `CLORETO DE COBRE I (OSO) PA 100grs***R$ 129,00` | **Cloreto de cobre I (oso)** | P.A. | 100 g (R$ 129,00) |
| 126 | `CLORETO DE COBRE II (ICO) PA 100grs***R$ 99,00` | **Cloreto de cobre II (ico)** | P.A. | 100 g (R$ 99,00) |
| 127 | `CLORETO DE ESTANHO II (OSO) (2H2O) PA ACS 100grs***R$ 159,00` | **Cloreto de estanho II (oso) (2H2O)** | P.A. ACS | 100 g (R$ 159,00) |
| 128 | `CLORETO DE FERRO III (ICO) ANIDRO 100grs***R$ 49,00` | **Cloreto de ferro III (ico) anidro** | — | 100 g (R$ 49,00) |
| 129 | `CLORETO DE LITIO P.A ACS 25grs***R$ 99,00` | **Cloreto de lítio** | P.A. ACS | 25 g (R$ 99,00) |
| 130 | `CLORETO DE MAGNESIO PA ACS 250grs***R$ 49,00` | **Cloreto de magnésio** | P.A. ACS | 250 g (R$ 49,00) |
| 131 | `CLORETO DE MERCURIO II (ICO) PA ACS 25grs***R$ 899,00` | **Cloreto de mercúrio II (ico)** | P.A. ACS | 25 g (R$ 899,00) |
| 132 | `CLORETO DE METILENO P.A ACS (DICLOROMETANO) 500ml***R$ 99,00//1 LITRO***R$179,00` | **Cloreto de metileno P.A ACS (diclorometano)** | P.A. ACS | 500 mL (R$ 99,00) // 1 L (R$ 179,00) |
| 133 | `CLORETO DE NIQUEL  II (OSO) (6H2O) PA ACS 100grs***R$ 49,00` | **Cloreto de níquel II (oso) (6H2O)** | P.A. ACS | 100 g (R$ 49,00) |
| 134 | `CLORETO DE POTASSIO P.A 500grs***R$ 59,00` | **Cloreto de potássio** | P.A. | 500 g (R$ 59,00) |
| 135 | `CLORETO DE SODIO P.A ACS 500grs***R$ 49,00` | **Cloreto de sódio** | P.A. ACS | 500 g (R$ 49,00) |
| 136 | `CLORETO DE TIONILA PS 100ml***  R$ 439,00` | **Cloreto de tionila** | P.S. | 100 mL (R$ 439,00) |
| 137 | `CLORETO DE TOSILA (PARA TOLUENO SULFONILA) P.A 100grs***R$ 129,00` | **Cloreto de tosila (para tolueno sulfonila)** | P.A. | 100 g (R$ 129,00) |
| 138 | `CLORETO DE ZINCO P.A 250grs***R$ 49,00` | **Cloreto de zinco** | P.A. | 250 g (R$ 49,00) |
| 139 | `CLORITO DE SODIO PURO 100grs***R$ 99,00` | **Clorito de sódio** | Puro | 100 g (R$ 99,00) |
| 140 | `CLOROACETAMIDA P.A 100grs***R$ 129,00` | **Cloroacetamida** | P.A. | 100 g (R$ 129,00) |
| 141 | `CLORO ANILINA (PARA) P.A ACS 100ml***R$ 299,00` | **Cloro anilina (para)** | P.A. ACS | 100 mL (R$ 299,00) |
| 142 | `CLOROBENZENO P.A 200ml***R$ 129,00` | **Clorobenzeno** | P.A. | 200 mL (R$ 129,00) |
| 143 | `CLOROFORMIO (TRICLOROMETANO) P.A ACS 500ml***R$ 99,00` | **Clorofórmio (triclorometano)** | P.A. ACS | 500 mL (R$ 99,00) |
| 144 | `COBRE EM PO 100grs***R$ 79,00` | **Cobre em po** | — | 100 g (R$ 79,00) |
| 145 | `CURCUMINA PURA 5grs***R$ 79,00` | **Curcumina** | Puro | 5 g (R$ 79,00) |
| 146 | `DDQ (DICLORO-2,3 DICIANO-5,6 BENZOQUINONA) 100grs***R$ 199,00` | **DDQ (dicloro-2,3 diciano-5,6 benzoquinona)** | — | 100 g (R$ 199,00) |
| 147 | `DICROMATO DE AMONIO P.A ACS 100grs***R$ 79,00` | **Dicromato de amônio** | P.A. ACS | 100 g (R$ 79,00) |
| 148 | `DICROMATO DE POTASSIO P.A ACS 100grs***R$ 79,00` | **Dicromato de potássio** | P.A. ACS | 100 g (R$ 79,00) |
| 149 | `DICROMATO DE SODIO P.A ACS 100grs***R$ 79,00` | **Dicromato de sódio** | P.A. ACS | 100 g (R$ 79,00) |
| 150 | `DIETILAMINA PS 200ml***R$ 99,00` | **Dietilamina** | P.S. | 200 mL (R$ 99,00) |
| 151 | `DIMETIL CARBONATO P.A ACS 50ml***R$ 129,00` | **Dimetil carbonato** | P.A. ACS | 50 mL (R$ 129,00) |
| 152 | `DIMETIL GLIOXIMA P.A ACS 25grs***R$ 99,00` | **Dimetil glioxima** | P.A. ACS | 25 g (R$ 99,00) |
| 153 | `DIMETILFORMAMIDA (DMF) P.A ACS 500ml***R$ 129,00` | **Dimetilformamida (DMF)** | P.A. ACS | 500 mL (R$ 129,00) |
| 154 | `DIMETILSULFOXIDO (DMSO) P.A ACS 200ml***R$ 129,00` | **Dimetilsulfoxido (DMSO)** | P.A. ACS | 200 mL (R$ 129,00) |
| 155 | `DIMETOXI BENZALDEIDO (2,5) P.A 50grs***R$ 299,00` | **Dimetoxi benzaldeído (2,5)** | P.A. | 50 g (R$ 299,00) |
| 156 | `DIOXIDO DE TITANIO IV P.A            250grs***R$ 49,00` | **Dióxido de titanio IV** | P.A. | 250 g (R$ 49,00) |
| 157 | `DIPIRONA SODICA Grau USP 100grs***R$ 299,00` | **Dipirona sódica** | Grau USP | 100 g (R$ 299,00) |
| 158 | `DITIONITO DE SODIO P.A 250grs***R$ 49,00` | **Ditionito de sódio** | P.A. | 250 g (R$ 49,00) |
| 159 | `DODECANO P.A 200ml***R$ 149,00` | **Dodecano** | P.A. | 200 mL (R$ 149,00) |
| 160 | `DODECANOTIOL P.A 100ml***R$ 149,00` | **Dodecanotiol** | P.A. | 100 mL (R$ 149,00) |
| 161 | `ESTANHO GRANULADO (20 MESH) P.A 100grs***R$ 99,00` | **Estanho granulado (20 MESH)** | P.A. | 100 g (R$ 99,00) |
| 162 | `ESTEARATO DE MAGNÉSIO P.A 250grs***R$ 129,00` | **Estearato de magnésio** | P.A. | 250 g (R$ 129,00) |
| 163 | `ETER ETILICO P.A 500ml***R$ 179,00//01 litro***R$350,00` | **Éter etílico** | P.A. | 500 mL (R$ 179,00) // 1 L (R$ 350,00) |
| 164 | `ETILENODIAMINA ANIDRA P.A 200ml***R$ 79,00` | **Etilenodiamina anidra** | P.A. | 200 mL (R$ 79,00) |
| 165 | `ETILENOGLICOL P.A (MONOETILENOGLICOL) 500ML***R$ 59,00` | **Etilenoglicol P.A (monoetilenoglicol)** | P.A. | 500 mL (R$ 59,00) |
| 166 | `ETOXIDO DE SODIO P.A 50grs***R$ 199,00` | **Etoxido de sódio** | P.A. | 50 g (R$ 199,00) |
| 167 | `EUGENOL PURO 50ml***R$ 249,00` | **Eugenol** | Puro | 50 mL (R$ 249,00) |
| 168 | `FENIL 2 NITROPROPENO (P2NP) P.A 25grs***R$ 299,00` | **Fenil 2 nitropropeno (P2NP)** | P.A. | 25 g (R$ 299,00) |
| 169 | `FENILACETALDEIDO PURO 50ml***R$ 199,00` | **Fenilacetaldeído** | Puro | 50 mL (R$ 199,00) |
| 170 | `FENIL ACETATO DE FENIL ETILA PURO 50ml***R$ 99,00` | **Fenil acetato de fenil etila** | Puro | 50 mL (R$ 99,00) |
| 171 | `FENILALANINA (L) P.A 100grs***R$ 89,00` | **Fenilalanina (l)** | P.A. | 100 g (R$ 89,00) |
| 172 | `FENOL CRISTAL PA ACS (ACIDO FENICO) 100grs***R$ 69,00` | **Fenol cristal PA ACS (ácido fênico)** | P.A. ACS | 100 g (R$ 69,00) |
| 173 | `FENOLFTALEINA P.A ACS 100grs***R$ 99,00` | **Fenolftaleína** | P.A. ACS | 100 g (R$ 99,00) |
| 174 | `FERRO REDUZIDO EM PO P.A 500grs***R$ 129,00` | **Ferro reduzido em po** | P.A. | 500 g (R$ 129,00) |
| 175 | `FERROCIANETO DE POTASSIO (3H2O) PA ACS 250grs***R$ 129,00` | **Ferrocianeto de potássio (3H2O)** | P.A. ACS | 250 g (R$ 129,00) |
| 176 | `FLUORETO DE AMONIO P.A ACS 100grs***R$ 49,00` | **Fluoreto de amônio** | P.A. ACS | 100 g (R$ 49,00) |
| 177 | `FLUORETO DE CALCIO P.A 25grs***R$ 129,00` | **Fluoreto de cálcio** | P.A. | 25 g (R$ 129,00) |
| 178 | `FLUORETO DE POTASSIO ANIDRO P.A 100grs***R$ 199,00` | **Fluoreto de potássio anidro** | P.A. | 100 g (R$ 199,00) |
| 179 | `FLUORETO DE SODIO ANIDRO P.A ACS 250grs***R$ 249,00` | **Fluoreto de sódio anidro** | P.A. ACS | 250 g (R$ 249,00) |
| 180 | `FORMALDEIDO (FORMOL) (ALDEIDO FORMICO) 37% P.A ACS 1 Litro***R$ 49,00` | **Formaldeído (formol) (aldeído fórmico) 37%** | P.A. ACS | 1 L (R$ 49,00) |
| 181 | `FORMAMIDA P.A ACS 500ml***R$ 199,00` | **Formamida** | P.A. ACS | 500 mL (R$ 199,00) |
| 182 | `FORMIATO DE SODIO P.A (FORMATO) 100grs***R$ 49,00` | **Formiato de sódio P.A (formato)** | P.A. | 100 g (R$ 49,00) |
| 183 | `FOSFATO DE CALCIO TRIBASICO P.A 500grs***R$ 49,00` | **Fosfato de cálcio tribásico** | P.A. | 500 g (R$ 49,00) |
| 184 | `FOSFATO DE FERRO P.A 25grs***R$ 99,00` | **Fosfato de ferro** | P.A. | 25 g (R$ 99,00) |
| 185 | `FOSFATO DE POTASSIO MONOBASICO ANIDRO P.A ACS 250grs***R$ 59,00` | **Fosfato de potássio monobásico anidro** | P.A. ACS | 250 g (R$ 59,00) |
| 186 | `FOSFATO DE SODIO DIBASICO (12H2O) P.A 250grs***R$ 49,00` | **Fosfato de sódio dibásico (12H2O)** | P.A. | 250 g (R$ 49,00) |
| 187 | `FOSFATO DE SODIO MONOBASICO (1H2O) P.A ACS 250grs***R$ 49,00` | **Fosfato de sódio monobásico (1H2O)** | P.A. ACS | 250 g (R$ 49,00) |
| 188 | `FOSFATO DE SODIO TRIBASICO (12H2O) PA ACS 250grs***R$ 49,00` | **Fosfato de sódio tribásico (12H2O)** | P.A. ACS | 250 g (R$ 49,00) |
| 189 | `FOSFORO VERMELHO PURO 25grs***R$ 249,00` | **Fósforo vermelho** | Puro | 25 g (R$ 249,00) |
| 190 | `FURFURAL (FURFURALDEIDO) P.S 100ml***R$ 99,00` | **Furfural (furfuraldeído)** | P.S. | 100 mL (R$ 99,00) |
| 191 | `GLICERINA BIDESTILADA P.A (VEGETAL) 500ml***R$ 49,00` | **Glicerina bidestilada P.A (vegetal)** | P.A. | 500 mL (R$ 49,00) |
| 192 | `GLICINA PA ACS (ACIDO AMINO ACETICO) 250ml***R$ 99,00` | **Glicina PA ACS (ácido amino acético)** | P.A. ACS | 250 mL (R$ 99,00) |
| 193 | `GLICINA ETIL ESTER (CLORIDRATO) 100grs***R$ 249,00` | **Glicina etil éster (cloridrato)** | — | 100 g (R$ 249,00) |
| 194 | `GUAIACOL PURO 50grs***R$ 69,00` | **Guaiacol** | Puro | 50 g (R$ 69,00) |
| 195 | `HELIONAL PURO 100ml***R$ 99,00` | **Helional** | Puro | 100 mL (R$ 99,00) |
| 196 | `HEPTANOATO DE ALILA PURO 100ml***R$ 69,00` | **Heptanoato de alila** | Puro | 100 mL (R$ 69,00) |
| 197 | `HEXAMETILENOTETRAMINA (HEXAMINA) (HMTA) PURA 250grs***R$ 49,00` | **Hexametilenotetramina (hexamina) (HMTA)** | Puro | 250 g (R$ 49,00) |
| 198 | `HEXANO P.A ACS (Mistura de Isomeros) 500ml***R$ 89,00` | **Hexano P.A ACS (mistura de isômeros)** | P.A. ACS | 500 mL (R$ 89,00) |
| 199 | `HIDRATO DE HIDRAZINA P.A 65% P.A ACS 100ml***R$ 249,00` | **Hidrato de hidrazina P.A 65%** | P.A. ACS | 100 mL (R$ 249,00) |
| 200 | `HIDRETO DE ALUMINIO P.A 25grs***R$ 249,00` | **Hidreto de alumínio** | P.A. | 25 g (R$ 249,00) |
| 201 | `HIDRETO DE LÍTIO E ALUMINIO P.A 25grs*** R$ 699,00` | **Hidreto de lítio e alumínio** | P.A. | 25 g (R$ 699,00) |
| 202 | `HIDRETO DE SODIO P.A 25grs***R$ 349,00` | **Hidreto de sódio** | P.A. | 25 g (R$ 349,00) |
| 203 | `HIDROQUINONA P.A 250grs***R$ 99,00` | **Hidroquinona** | P.A. | 250 g (R$ 99,00) |
| 204 | `HIDROXIDO DE AMONIO 28% - 30% PA ACS 1 Litro***R$ 99,00` | **Hidróxido de amônio 28% - 30%** | P.A. ACS | 1 L (R$ 99,00) |
| 205 | `HIDROXIDO DE CALCIO P.A ACS 500grs***R$ 49,00` | **Hidróxido de cálcio** | P.A. ACS | 500 g (R$ 49,00) |
| 206 | `HIDROXIDO DE MAGNÉSIO P.A 500grs***R$ 69,00` | **Hidróxido de magnésio** | P.A. | 500 g (R$ 69,00) |
| 207 | `HIDROXIDO DE POTASSIO P.A ACS 500grs***R$ 69,00` | **Hidróxido de potássio** | P.A. ACS | 500 g (R$ 69,00) |
| 208 | `HIDROXIDO DE SODIO (MICROPEROLAS) P.A ACS 500grs***R$ 49,00` | **Hidróxido de sódio (micropérolas)** | P.A. ACS | 500 g (R$ 49,00) |
| 209 | `HIDROXILAMINA (CLORIDRATO) P.A 100grs***R$ 129,00` | **Hidroxilamina (cloridrato)** | P.A. | 100 g (R$ 129,00) |
| 210 | `HIDROXILAMINA (SULFATO) P.A ACS 100grs***R$ 99,00` | **Hidroxilamina (sulfato)** | P.A. ACS | 100 g (R$ 99,00) |
| 211 | `HIPOFOSFITO DE SODIO MONOHIDRATADO P.A 250grs***R$ 49,00` | **Hipofosfito de sódio monohidratado** | P.A. | 250 g (R$ 49,00) |
| 212 | `IMIDAZOL P.A ACS 100grs***R$ 69,00` | **Imidazol** | P.A. ACS | 100 g (R$ 69,00) |
| 213 | `INDOL P.A 50grs***R$ 129,00` | **Indol** | P.A. | 50 g (R$ 129,00) |
| 214 | `IODATO DE POTASSIO P.A ACS 100grs***R$ 199,00` | **Iodato de potássio** | P.A. ACS | 100 g (R$ 199,00) |
| 215 | `IODETO DE METILA P.A ACS 25ml***R$ 349,00` | **Iodeto de metila** | P.A. ACS | 25 mL (R$ 349,00) |
| 216 | `IODETO DE POTASSIO P.A ACS 50grs***R$ 129,00` | **Iodeto de potássio** | P.A. ACS | 50 g (R$ 129,00) |
| 217 | `IODO METALICO P.A ACS 50grs***R$ 129,00` | **Iodo metálico** | P.A. ACS | 50 g (R$ 129,00) |
| 218 | `ISOPROPOXIDO DE ALUMINIO P.A 100grs***R$ 129,00` | **Isopropoxido de alumínio** | P.A. | 100 g (R$ 129,00) |
| 219 | `ISOPROPOXIDO DE TITÂNIO P.A 100ml***R$ 129,00` | **Isopropoxido de titânio** | P.A. | 100 mL (R$ 129,00) |
| 220 | `LACTOSE (1H2O) P.A (D+) 500grs***R$ 59,00` | **Lactose (1H2O) P.A (d+)** | P.A. | 500 g (R$ 59,00) |
| 221 | `LAURIL SULFATO DE SODIO P.A 100grs***R$ 49,00` | **Lauril sulfato de sódio** | P.A. | 100 g (R$ 49,00) |
| 222 | `LIDOCAINA (CLORIDRATO) Grau USP 100grs***R$ 199,00` | **Lidocaina (cloridrato)** | Grau USP | 100 g (R$ 199,00) |
| 223 | `MAGNESIO EM APARAS 100grs***R$ 129,00` | **Magnésio em aparas** | — | 100 g (R$ 129,00) |
| 224 | `MERCURIO METALICO 10grs***R$ 399,00` | **Mercúrio metálico** | — | 10 g (R$ 399,00) |
| 225 | `METABISULFITO DE SÓDIO P.A ACS 500grs***R$ 49,00` | **Metabisulfito de sódio** | P.A. ACS | 500 g (R$ 49,00) |
| 226 | `METIL ETIL CETONA (MEK) P.A ACS 500ML***R$ 99,00` | **Metil etil cetona (MEK)** | P.A. ACS | 500 mL (R$ 99,00) |
| 227 | `2'METIL PIRIDINA P.A ACS 100ml***R$ 129,00` | **2'metil piridina** | P.A. ACS | 100 mL (R$ 129,00) |
| 228 | ` 4'METIL PROPIOFENONA 200ml***R$ 299,00` | **4'metil propiofenona** | — | 200 mL (R$ 299,00) |
| 229 | `METILAMINA 40% AQUOSA P.A 200ml***R$ 299,00` | **Metilamina 40% aquosa** | P.A. | 200 mL (R$ 299,00) |
| 230 | `METOXIDO DE SÓDIO P.A 50grs***R$ 179,00` | **Metoxido de sódio** | P.A. | 50 g (R$ 179,00) |
| 231 | `MOLIBDATO DE AMONEO (4H2O) PA ACS 50grs***R$ 129,00` | **Molibdato de amoneo (4H2O)** | P.A. ACS | 50 g (R$ 129,00) |
| 232 | `MORFOLINA P.A ACS 200ml***R$ 79,00` | **Morfolina** | P.A. ACS | 200 mL (R$ 79,00) |
| 233 | `N BROMOSUCCINIMIDA PS  50grs***R$ 199,00` | **N bromosuccinimida** | P.S. | 50 g (R$ 199,00) |
| 234 | `N METIL 2 PIRROLIDONA PS 200ml***       R$ 129,00` | **N metil 2 pirrolidona** | P.S. | 200 mL (R$ 129,00) |
| 235 | `NIQUEL EM PO 50grs***R$ 99,00` | **Níquel em po** | — | 50 g (R$ 99,00) |
| 236 | `NITRATO DE BÁRIO P.A ACS 100grs***R$ 49,00` | **Nitrato de bário** | P.A. ACS | 100 g (R$ 49,00) |
| 237 | `NITRATO DE BISMUTO III NEUTRO PA ACS 50grs***R$ 79,00` | **Nitrato de bismuto III neutro** | P.A. ACS | 50 g (R$ 79,00) |
| 238 | `NITRATO DE CHUMBO II PA ACS  250grs***R$ 49,00` | **Nitrato de chumbo II** | P.A. ACS | 250 g (R$ 49,00) |
| 239 | `NITRATO DE COBRE II ICO (3H2O) PA ACS 250grs***R$ 59,00` | **Nitrato de cobre II ico (3H2O)** | P.A. ACS | 250 g (R$ 59,00) |
| 240 | `NITRATO DE MANGANES III (SOL. 50%) 250ml***R$ 119,00` | **Nitrato de manganês III (sol. 50%)** | — | 250 mL (R$ 119,00) |
| 241 | `NITRATO DE POTASSIO P.A ACS 100grs***R$ 99,00` | **Nitrato de potássio** | P.A. ACS | 100 g (R$ 99,00) |
| 242 | `NITRATO DE PRATA P.A ACS 5 grs***R$ 299,00` | **Nitrato de prata** | P.A. ACS | 5 g (R$ 299,00) |
| 243 | `NITRATO DE SODIO P.A ACS 250grs***R$ 49,00` | **Nitrato de sódio** | P.A. ACS | 250 g (R$ 49,00) |
| 244 | `NITRITO DE ISOAMILA PURO 97% 25ml***R$ 99,00` | **Nitrito de isoamila puro 97%** | Puro | 25 mL (R$ 99,00) |
| 245 | `NITRITO DE ISOBUTILA PURO 97% 25ml***R$ 99,00` | **Nitrito de isobutila puro 97%** | Puro | 25 mL (R$ 99,00) |
| 246 | `NITRITO DE SODIO P.A ACS 500grs***R$ 49,00` | **Nitrito de sódio** | P.A. ACS | 500 g (R$ 49,00) |
| 247 | `NITROBENZENO P.A ACS 200ml***R$ 69,00` | **Nitrobenzeno** | P.A. ACS | 200 mL (R$ 69,00) |
| 248 | `NITROETANO P.A 100ml***R$ 349,00` | **Nitroetano** | P.A. | 100 mL (R$ 349,00) |
| 249 | `NITROMETANO P.A 100ml***R$ 249,00` | **Nitrometano** | P.A. | 100 mL (R$ 249,00) |
| 250 | `NITROPRUSSIATO DE SÓDIO 2H2O PA ACS 25grs***R$ 69,00` | **Nitroprussiato de sódio 2H2O** | P.A. ACS | 25 g (R$ 69,00) |
| 251 | `ORTO TOLUIDINA P.A 50ml***R$ 99,00` | **Orto toluidina** | P.A. | 50 mL (R$ 99,00) |
| 252 | `OXIDO DE ALUMINIO P.A 250grs***R$ 59,00` | **Óxido de alumínio** | P.A. | 250 g (R$ 59,00) |
| 253 | `OXIDO DE ANTIMONIO III P.A (TRIOXIDO) 50grs***R$ 129,00` | **Óxido de antimônio III P.A (trióxido)** | P.A. | 50 g (R$ 129,00) |
| 254 | `OXIDO DE CALCIO P.A 500grs***R$ 69,00` | **Óxido de cálcio** | P.A. | 500 g (R$ 69,00) |
| 255 | `OXIDO DE COBRE I (OSO) P.A 50grs***R$ 99,00` | **Óxido de cobre I (oso)** | P.A. | 50 g (R$ 99,00) |
| 256 | `OXIDO DE COBRE II (ICO) PA ACS 100grs***R$ 79,00` | **Óxido de cobre II (ico)** | P.A. ACS | 100 g (R$ 79,00) |
| 257 | `OXIDO DE ZINCO P.A ACS 500grs***R$ 89,00` | **Óxido de zinco** | P.A. ACS | 500 g (R$ 89,00) |
| 258 | `PARAFORMALDEIDO P.A 250grs***R$ 59,00` | **Paraformaldeído** | P.A. | 250 g (R$ 59,00) |
| 259 | `PENTOXIDO DE FOSFORO (OXIDO DE FOSFORO V) PA ACS 250grs***R$ 99,00` | **Pentóxido de fósforo (óxido de fósforo V)** | P.A. ACS | 250 g (R$ 99,00) |
| 260 | `PENTOXIDO DE VANÁDIO (OXIDO DE VANADIO V) P.A 50grs***R$ 99,00` | **Pentóxido de vanádio (óxido de vanádio V)** | P.A. | 50 g (R$ 99,00) |
| 261 | `PERBORATO DE SODIO 4H2O PA 250grs***R$ 99,00` | **Perborato de sódio 4H2O** | P.A. | 250 g (R$ 99,00) |
| 262 | `PERCARBONATO DE SÓDIO 100grs***R$ 149,00` | **Percarbonato de sódio** | — | 100 g (R$ 149,00) |
| 263 | `PERCLORATO DE SODIO ANIDRO PA ACS 100grs***R$ 319,00` | **Perclorato de sódio anidro** | P.A. ACS | 100 g (R$ 319,00) |
| 264 | `PERCLORATO DE POTÁSSIO P.A 250grs***299,00` | **Perclorato de potássio** | P.A. | 250 g (R$ 299,00) |
| 265 | `PERIODATO DE SODIO (META) P.A ACS 50grs***R$ 299,00` | **Periodato de sódio (meta)** | P.A. ACS | 50 g (R$ 299,00) |
| 266 | `PERMANGANATO DE POTASSIO P.A ACS 50grs***R$ 129,00` | **Permanganato de potássio** | P.A. ACS | 50 g (R$ 129,00) |
| 267 | `PEROXIDO DE HIDROGENIO 50% (200Vol) P.A ACS 1 Litro***R$ 79,00` | **Peróxido de hidrogênio 50% (200Vol)** | P.A. ACS | 1 L (R$ 79,00) |
| 268 | `PEROXIMONOSULFATO DE POTÁSSIO (OXONE) P.A 100grs***R$ 99,00` | **Peroximonosulfato de potássio (oxone)** | P.A. | 100 g (R$ 99,00) |
| 269 | `PERSULFATO DE AMONIO P.A ACS 250grs***R$ 59,00` | **Persulfato de amônio** | P.A. ACS | 250 g (R$ 59,00) |
| 270 | `PERSULFATO DE POTASSIO P.A ACS 250grs***R$ 59,00` | **Persulfato de potássio** | P.A. ACS | 250 g (R$ 59,00) |
| 271 | `PICRATO DE BUTESINA Grau USP 5 grs***R$ 99,00` | **Picrato de butesina** | Grau USP | 5 g (R$ 99,00) |
| 272 | `PIPERIDINA (CLORIDRATO) P.A 50grs***R$ 399,00` | **Piperidina (cloridrato)** | P.A. | 50 g (R$ 399,00) |
| 273 | `PIRIDINA P.A ACS 200ml***R$ 89,00` | **Piridina** | P.A. ACS | 200 mL (R$ 89,00) |
| 274 | `PROLINA (L) P.A 50grs***R$ 99,00` | **Prolina (l)** | P.A. | 50 g (R$ 99,00) |
| 275 | `PROPANOLOL (CLORIDRATO) Grau USP 100grs***R$ 199,00` | **Propanolol (cloridrato)** | Grau USP | 100 g (R$ 199,00) |
| 276 | `PROPILENOGLICOL 1,2 P.A ACS 500ml***R$ 69,00` | **Propilenoglicol 1,2** | P.A. ACS | 500 mL (R$ 69,00) |
| 277 | `PROPIOFENONA P.A 50ml***R$ 199,00` | **Propiofenona** | P.A. | 50 mL (R$ 199,00) |
| 278 | `SACAROSE (SUCROSE) D(+) P.A 500grs***R$ 49,00` | **Sacarose (sucrose) d(+)** | P.A. | 500 g (R$ 49,00) |
| 279 | `SAFRANINA P.A 25grs***R$ 79,00` | **Safranina** | P.A. | 25 g (R$ 79,00) |
| 280 | `SALICILATO DE METILA P.A 500ml***R$ 99,00` | **Salicilato de metila** | P.A. | 500 mL (R$ 99,00) |
| 281 | `SODAMIDA P.A 50grs***R$ 749,00` | **Sodamida** | P.A. | 50 g (R$ 749,00) |
| 282 | `SODIO METALICO PURO 50grs***R$ 149,00` | **Sódio metálico** | Puro | 50 g (R$ 149,00) |
| 283 | `SULFANILAMIDA P.A 50grs***R$ 69,00` | **Sulfanilamida** | P.A. | 50 g (R$ 69,00) |
| 284 | `SULFATO DE ALUMINIO E POTASSIO 12H2O P.A ACS (ALUMEN) 250grs***R$ 59,00` | **Sulfato de alumínio e potássio 12H2O P.A ACS (alúmen)** | P.A. ACS | 250 g (R$ 59,00) |
| 285 | `SULFATO DE AMONIO P.A ACS 250grs***R$ 49,00` | **Sulfato de amônio** | P.A. ACS | 250 g (R$ 49,00) |
| 286 | `SULFATO DE ATROPINA Grau USP 5 grs***R$ 599,00` | **Sulfato de atropina** | Grau USP | 5 g (R$ 599,00) |
| 287 | `SULFATO DE COBRE II ICO (5H2O) PA ACS 250grs***R$ 49,00` | **Sulfato de cobre II ico (5H2O)** | P.A. ACS | 250 g (R$ 49,00) |
| 288 | `SULFATO DE HIDRAZINA P.A ACS 50grs***R$ 99,00` | **Sulfato de hidrazina** | P.A. ACS | 50 g (R$ 99,00) |
| 289 | `SULFATO DE MAGNESIO ANIDRO 250grs***R$ 69,00` | **Sulfato de magnésio anidro** | — | 250 g (R$ 69,00) |
| 290 | `SULFATO DE MANGANES P.A ACS 250grs***R$ 49,00` | **Sulfato de manganês** | P.A. ACS | 250 g (R$ 49,00) |
| 291 | `SULFATO DE SODIO ANIDRO PA ACS 500grsR$ 49,00` | **Sulfato de sódio anidro** | P.A. ACS | 500 g (R$ 49,00) |
| 292 | `SULFATO DE FERRO  II (OSO) 7 H2O P.A ACS 250grs***R$ 49,00` | **Sulfato de ferro II (oso) 7 H2O** | P.A. ACS | 250 g (R$ 49,00) |
| 293 | `SULFETO DE FOSFORO (PENTASULFETO) P.A 25grs***R$ 349,00` | **Sulfeto de fósforo (pentasulfeto)** | P.A. | 25 g (R$ 349,00) |
| 294 | `SULFETO DE SODIO 9H2O PA ACS 100grs***R$ 399,00` | **Sulfeto de sódio 9H2O** | P.A. ACS | 100 g (R$ 399,00) |
| 295 | `SULFITO DE SODIO ANIDRO PA ACS 500grs***R$ 49,00` | **Sulfito de sódio anidro** | P.A. ACS | 500 g (R$ 49,00) |
| 296 | `TBAB (BROMETO DE TETRA BUTIL AMONIO) P.A ACS 100grs***R$ 99,00` | **TBAB (brometo de tetra butil amônio)** | P.A. ACS | 100 g (R$ 99,00) |
| 297 | `TCCA (ACIDO TRICLORO CIANURICO) (TRICLOROTRIAZINA) P.A 250grs***R$ 149,00` | **TCCA (ácido tricloro cianúrico) (triclorotriazina)** | P.A. | 250 g (R$ 149,00) |
| 298 | `TETRACAINA (CLORIDRATO) Grau USP 100grs***R$ 299,00` | **Tetracaina (cloridrato)** | Grau USP | 100 g (R$ 299,00) |
| 299 | `TETRAHIDROFURANO (THF) P.A ACS 500ml***R$ 99,00` | **Tetrahidrofurano (THF)** | P.A. ACS | 500 mL (R$ 99,00) |
| 300 | `TIOCIANATO DE AMONIO P.A ACS 200grs***R$ 49,00` | **Tiocianato de amônio** | P.A. ACS | 200 g (R$ 49,00) |
| 301 | `TIOCIANATO DE POTASSIO P.A ACS 250grs***R$ 99,00` | **Tiocianato de potássio** | P.A. ACS | 250 g (R$ 99,00) |
| 302 | `TIOSSULFATO DE SODIO CRISTAL (5H2O) PA ACS 300grs***R$ 49,00` | **Tiossulfato de sódio cristal (5H2O)** | P.A. ACS | 300 g (R$ 49,00) |
| 303 | `TIOUREIA P.A ACS 250grs***R$ 49,00` | **Tioureia** | P.A. ACS | 250 g (R$ 49,00) |
| 304 | `TOLUENO (TOLUOL) P.A ACS 1 Litro***R$ 129,00` | **Tolueno (toluol)** | P.A. ACS | 1 L (R$ 129,00) |
| 305 | `TRICLOROETILENO P.A ACS 500ml***R$ 99,00` | **Tricloroetileno** | P.A. ACS | 500 mL (R$ 99,00) |
| 306 | `TRIETILAMINA P.A 200ml***R$ 79,00` | **Trietilamina** | P.A. | 200 mL (R$ 79,00) |
| 307 | `TRIFENIL FOSFINA P.A 50grs***R$ 299,00` | **Trifenil fosfina** | P.A. | 50 g (R$ 299,00) |
| 308 | `TROPINONA PS 25grs***R$ 349,00` | **Tropinona** | P.S. | 25 g (R$ 349,00) |
| 309 | `UREIA P.A ACS 500grs***R$ 49,00` | **Ureia** | P.A. ACS | 500 g (R$ 49,00) |
| 310 | `VANILINA P.A 50grs***R$ 69,00` | **Vanilina** | P.A. | 50 g (R$ 69,00) |
| 311 | `XILENO (XILOL) PA ACS ISO (Mistura de Isomeros) 1 Litro***R$ 129,00` | **Xileno (xilol) PA ACS ISO (mistura de isômeros)** | P.A. ACS ISO | 1 L (R$ 129,00) |
| 312 | `ZINCO METALICO EM PO P.A 250grs***R$ 69,00` | **Zinco metálico em po** | P.A. | 250 g (R$ 69,00) |
