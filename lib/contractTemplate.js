import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ACTIVE_CONTRACT_TEMPLATE } from './contractModel.js';

const DEFAULT_CONTRATANTE = {
  nome: 'UNUS Núcleo Imobiliário',
  cnpj: '27.451.245/0001-91',
  endereco:
    'K Platz Corporate - R. Elizeu di Bernardi, 34 - sala 601 - Campinas, São José - SC, 88101-050',
  representanteLegal: 'Luiz Henrique Filho',
  nacionalidade: 'Brasileiro',
};

const DEFAULT_CONTRATADO = {
  nome: 'Fábio Henrique Silva Alves Nascimento',
  cnpj: '46.550.399/0001-85',
  cpf: '122.490.576-80',
  endereco: 'Av. Presidente Tancredo Neves, 682, Cláudio, Minas Gerais',
  assinatura: 'FÁBIO HENRIQUE S. A. NASCIMENTO',
};

const LONG_MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const normalize = (value, fallback) => {
  const trimmed = String(value ?? '').trim();
  return trimmed || fallback;
};

const canonicalize = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const preferCanonicalValue = (value, canonical) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return canonical;
  return canonicalize(trimmed) === canonicalize(canonical) ? canonical : trimmed;
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatLongDate = (date = new Date()) =>
  `${date.getDate()} de ${LONG_MONTHS[date.getMonth()]} de ${date.getFullYear()}`;

const slugify = (value) =>
  String(value ?? 'cliente')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'cliente';

export const getContractTemplateMeta = () => ({
  id: ACTIVE_CONTRACT_TEMPLATE.id,
  name: ACTIVE_CONTRACT_TEMPLATE.name,
  requiredFields: [...ACTIVE_CONTRACT_TEMPLATE.requiredFields],
});

export const getGeneratedContractPath = (row = {}, date = new Date()) => {
  const timestamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    '-',
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
  ].join('');

  return `contracts/${slugify(row.cliente || DEFAULT_CONTRATANTE.nome)}-${timestamp}.pdf`;
};

export const renderContractText = (row = {}, date = new Date()) => {
  const contratanteNome = preferCanonicalValue(row.razao_social, DEFAULT_CONTRATANTE.nome);
  const contratanteCnpj = preferCanonicalValue(row.cnpj, DEFAULT_CONTRATANTE.cnpj);
  const contratanteEndereco = preferCanonicalValue(row.endereco, DEFAULT_CONTRATANTE.endereco);
  const estadoCivil = normalize(row.estado_civil, '{{ESTADO_CIVIL}}');
  const cpfRepresentante = normalize(row.cpf_representante, '{{CPF_REPRESENTANTE}}');
  const localData = `Cláudio/MG, ${formatLongDate(date)}.`;

  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE DESENVOLVIMENTO E INTEGRAÇÃO DIGITAL

Pelo presente instrumento particular, as partes abaixo qualificadas celebram entre si este Contrato, regido pelas cláusulas e condições a seguir descritas:

DAS PARTES

CONTRATANTE: ${contratanteNome}
CNPJ/CPF: ${contratanteCnpj}
Endereço: ${contratanteEndereco}
Representante Legal: ${DEFAULT_CONTRATANTE.representanteLegal}, ${DEFAULT_CONTRATANTE.nacionalidade}, ${estadoCivil}, portador(a) do CPF nº ${cpfRepresentante}.

CONTRATADO: ${DEFAULT_CONTRATADO.nome}
CNPJ: ${DEFAULT_CONTRATADO.cnpj} (Registrado em Cláudio/MG)
CPF: ${DEFAULT_CONTRATADO.cpf}
Endereço: ${DEFAULT_CONTRATADO.endereco}

---

CLÁUSULA PRIMEIRA – DO OBJETO
O presente contrato tem como objeto o desenvolvimento de um Portal Imobiliário Completo, focado em alto padrão, performance e automação de dados:
1. Interface Visual (UI/UX): Reconstrução total em WordPress + Elementor focado em imóveis de luxo.
2. Integração VISTA API: Sincronização automatizada do estoque de 600 imóveis em tempo real.
3. Integração CRM C2S: Configuração de fluxos para envio automático de leads para o funil de vendas.
4. Otimização Técnica: Migração para servidor no Brasil, redução de latência e implementação de SEO.

CLÁUSULA SEGUNDA – ETAPAS, PRAZOS E OBRIGAÇÕES
O projeto será executado em um prazo estimado de 15 a 20 dias úteis, contados a partir da entrega de todos os acessos e materiais (textos, imagens, logotipos) solicitados no Onboarding:
- Fase 01 (Alinhamento): Integração técnica VISTA e definição estratégica.
- Fase 02 (Desenvolvimento): Execução da interface e testes de usabilidade.
- Fase 03 (Homologação): Publicação oficial e suporte dedicado pós-lançamento.

Parágrafo Primeiro: O prazo de execução será imediatamente suspenso caso a CONTRATANTE atrase a entrega de materiais ou acessos técnicos necessários para o andamento das etapas.
Parágrafo Segundo: Durante a Fase 03 (Homologação), a CONTRATANTE terá direito a até 02 (duas) rodadas de revisões e ajustes sem custo adicional. Alterações de escopo estrutural não previstas inicialmente serão orçadas à parte.

CLÁUSULA TERCEIRA – DOS VALORES E PAGAMENTO
A CONTRATANTE pagará ao CONTRATADO os seguintes valores:
1. Desenvolvimento do Projeto: R$ 2.250,00 (dois mil, duzentos e cinquenta reais).
    - Sinal (50%): R$ 1.125,00 pagos na assinatura para início imediato do cronograma.
    - Entrega (50%): R$ 1.125,00 pagos na homologação e publicação final do site.

2. Manutenção e Suporte Mensal: R$ 200,00/mês (duzentos reais mensais), com vencimento no dia 05 de cada mês subsequente à publicação.
    - Cobre backups diários, atualizações de segurança e suporte técnico à equipe.

3. Hospedagem: O custo e a contratação do servidor de hospedagem (ex: Locaweb/Hostinger) são de responsabilidade direta da CONTRATANTE, garantindo que a titularidade da conta e dos arquivos permaneça sob sua posse exclusiva.

Parágrafo Único: Em caso de atraso superior a 05 (cinco) dias no pagamento de qualquer parcela ou mensalidade, incidirá multa não compensatória de 2% (dois por cento) sobre o valor em atraso, acrescida de juros de mora de 1% (um por cento) ao mês.

CLÁUSULA QUARTA – DA PROPRIEDADE DO ATIVO (SEM LOCK-IN)
Após a quitação do valor total de desenvolvimento, a CONTRATANTE detém a propriedade integral de todo o código-fonte, banco de dados e arquivos. O CONTRATADO garante a entrega de todas as credenciais administrativas, eliminando qualquer vínculo de dependência técnica (lock-in).

CLÁUSULA QUINTA – RESCISÃO E VIGÊNCIA
O suporte mensal vigerá por prazo indeterminado. Este contrato poderá ser rescindido por qualquer das partes mediante aviso prévio por escrito de 30 (trinta) dias.
Em caso de rescisão durante o desenvolvimento do projeto por parte da CONTRATANTE, o valor referente ao Sinal (50%) não será devolvido, cobrindo as horas já trabalhadas.

CLÁUSULA SEXTA – FORO
As partes elegem o foro da Comarca de Cláudio/MG para dirimir quaisquer controvérsias.

Local e Data: ${localData}


${DEFAULT_CONTRATANTE.representanteLegal}
CONTRATANTE


${DEFAULT_CONTRATADO.assinatura}
CONTRATADO`;
};

export const renderContractHtml = (row = {}, date = new Date()) => {
  const contractText = renderContractText(row, date);
  const emailPrincipal = normalize(row.email_relatorios, 'Não informado');
  const generatedAt = date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(ACTIVE_CONTRACT_TEMPLATE.name)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f0e8;
      --paper: #fffdfa;
      --ink: #191511;
      --muted: #6c6257;
      --line: #d8cdbd;
      --accent: #8a5a22;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 32px 16px;
      background: linear-gradient(180deg, #ece5d8 0%, var(--bg) 100%);
      color: var(--ink);
      font-family: Georgia, "Times New Roman", serif;
    }

    .sheet {
      max-width: 960px;
      margin: 0 auto;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 24px;
      box-shadow: 0 24px 80px rgba(45, 31, 17, 0.12);
      overflow: hidden;
    }

    .header {
      padding: 32px 40px 24px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(135deg, rgba(138, 90, 34, 0.08), rgba(255, 253, 250, 0.9));
    }

    .eyebrow {
      margin: 0 0 10px;
      font: 700 11px/1.4 Arial, sans-serif;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }

    h1 {
      margin: 0;
      font-size: 34px;
      line-height: 1.1;
    }

    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 20px;
      font-family: Arial, sans-serif;
    }

    .meta-card {
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.75);
    }

    .meta-card dt {
      margin: 0 0 6px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .meta-card dd {
      margin: 0;
      font-size: 14px;
      color: var(--ink);
      word-break: break-word;
    }

    .body {
      padding: 40px;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      font: 400 16px/1.75 Georgia, "Times New Roman", serif;
    }

    @media print {
      body { padding: 0; background: #fff; }
      .sheet {
        border: none;
        border-radius: 0;
        box-shadow: none;
      }
      .header, .body { padding-left: 0; padding-right: 0; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header class="header">
      <p class="eyebrow">Contrato ativo no admin</p>
      <h1>${escapeHtml(ACTIVE_CONTRACT_TEMPLATE.name)}</h1>
      <dl class="meta">
        <div class="meta-card">
          <dt>Template</dt>
          <dd>${escapeHtml(ACTIVE_CONTRACT_TEMPLATE.id)}</dd>
        </div>
        <div class="meta-card">
          <dt>Cliente</dt>
          <dd>${escapeHtml(normalize(row.cliente, DEFAULT_CONTRATANTE.nome))}</dd>
        </div>
        <div class="meta-card">
          <dt>E-mail principal</dt>
          <dd>${escapeHtml(emailPrincipal)}</dd>
        </div>
        <div class="meta-card">
          <dt>Gerado em</dt>
          <dd>${escapeHtml(generatedAt)}</dd>
        </div>
      </dl>
    </header>
    <section class="body">
      <pre>${escapeHtml(contractText)}</pre>
    </section>
  </main>
</body>
</html>`;
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 48;
const BODY_FONT_SIZE = 11;
const BODY_LINE_HEIGHT = 17;
const TITLE_FONT_SIZE = 15;
const META_FONT_SIZE = 10;
const PARAGRAPH_GAP = 9;
const TEXT_COLOR = rgb(0.11, 0.09, 0.07);
const MUTED_COLOR = rgb(0.44, 0.38, 0.33);

const wrapText = (text, font, fontSize, maxWidth, continuedIndent = '') => {
  if (!text.trim()) return [''];

  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const width = font.widthOfTextAtSize(candidate, fontSize);

    if (current && width > maxWidth) {
      lines.push(current);
      current = `${continuedIndent}${word}`;
      continue;
    }

    current = candidate;
  }

  if (current) lines.push(current);
  return lines;
};

const splitIndentedLine = (line) => {
  const bulletMatch = line.match(/^(\s*(?:\d+\.\s+|-+\s+))(.*)$/);
  if (!bulletMatch) return { prefix: '', content: line.trim() };

  return {
    prefix: bulletMatch[1],
    content: bulletMatch[2].trim(),
  };
};

export const renderContractPdf = async (row = {}, date = new Date()) => {
  const contractText = renderContractText(row, date);
  const [rawTitle, ...rawBodyLines] = contractText.split('\n');
  const bodyLines = rawBodyLines[0] === '' ? rawBodyLines.slice(1) : rawBodyLines;

  const pdf = await PDFDocument.create();
  pdf.setTitle(ACTIVE_CONTRACT_TEMPLATE.name);
  pdf.setAuthor(DEFAULT_CONTRATADO.nome);
  pdf.setSubject('Contrato de Prestacao de Servicos');
  pdf.setCreator('FHSAN Admin');
  pdf.setProducer('pdf-lib');

  const titleFont = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const bodyFont = await pdf.embedFont(StandardFonts.TimesRoman);
  const metaFont = await pdf.embedFont(StandardFonts.Helvetica);

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - PAGE_MARGIN;

  const ensureSpace = (spaceNeeded) => {
    if (y - spaceNeeded >= PAGE_MARGIN) return;
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - PAGE_MARGIN;
  };

  const drawTextLine = (text, x, font, size, color = TEXT_COLOR) => {
    ensureSpace(size + 4);
    page.drawText(text, { x, y, size, font, color });
    y -= size + 4;
  };

  const drawWrappedParagraph = (line, { font = bodyFont, size = BODY_FONT_SIZE, color = TEXT_COLOR } = {}) => {
    if (!line.trim()) {
      y -= PARAGRAPH_GAP;
      return;
    }

    if (line.trim() === '---') {
      ensureSpace(BODY_LINE_HEIGHT);
      page.drawLine({
        start: { x: PAGE_MARGIN, y: y + 2 },
        end: { x: PAGE_WIDTH - PAGE_MARGIN, y: y + 2 },
        thickness: 1,
        color: MUTED_COLOR,
      });
      y -= BODY_LINE_HEIGHT;
      return;
    }

    const { prefix, content } = splitIndentedLine(line);
    const prefixWidth = prefix ? font.widthOfTextAtSize(prefix, size) : 0;
    const maxWidth = PAGE_WIDTH - PAGE_MARGIN * 2 - prefixWidth;
    const wrapped = wrapText(content, font, size, maxWidth, ' '.repeat(prefix.length));

    wrapped.forEach((segment, index) => {
      ensureSpace(BODY_LINE_HEIGHT);
      page.drawText(index === 0 ? `${prefix}${segment}` : segment, {
        x: PAGE_MARGIN,
        y,
        size,
        font,
        color,
      });
      y -= BODY_LINE_HEIGHT;
    });
  };

  const titleWidth = titleFont.widthOfTextAtSize(rawTitle, TITLE_FONT_SIZE);
  page.drawText(rawTitle, {
    x: Math.max(PAGE_MARGIN, (PAGE_WIDTH - titleWidth) / 2),
    y,
    size: TITLE_FONT_SIZE,
    font: titleFont,
    color: TEXT_COLOR,
  });
  y -= TITLE_FONT_SIZE + 14;

  drawTextLine(`Modelo ativo: ${ACTIVE_CONTRACT_TEMPLATE.id}`, PAGE_MARGIN, metaFont, META_FONT_SIZE, MUTED_COLOR);
  drawTextLine(
    `Cliente: ${normalize(row.cliente, DEFAULT_CONTRATANTE.nome)}`,
    PAGE_MARGIN,
    metaFont,
    META_FONT_SIZE,
    MUTED_COLOR
  );
  drawTextLine(
    `Gerado em: ${date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`,
    PAGE_MARGIN,
    metaFont,
    META_FONT_SIZE,
    MUTED_COLOR
  );
  y -= 8;

  bodyLines.forEach((line) => {
    const trimmed = line.trim();
    const isHeading =
      trimmed === 'DAS PARTES' ||
      trimmed.startsWith('CLÁUSULA') ||
      trimmed === 'CONTRATANTE' ||
      trimmed === 'CONTRATADO';

    drawWrappedParagraph(line, {
      font: isHeading ? titleFont : bodyFont,
      size: isHeading ? 12 : BODY_FONT_SIZE,
      color: TEXT_COLOR,
    });
  });

  return Buffer.from(await pdf.save());
};
