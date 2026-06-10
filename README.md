# Luana Maria — Método Repair Brows

Site premium para Luana Maria, especialista em reconstrução de sobrancelhas e criadora do **Método Repair Brows**.

---

## ✅ Como funciona este projeto

A imagem principal de Luana Maria está **embutida diretamente no `index.html`** como base64 — isso garante que ela apareça corretamente em **qualquer ambiente**: abertura local, GitHub Pages, Vercel, Netlify, etc. Sem dependência de caminho de arquivo.

---

## 📁 Estrutura do Projeto

```
repairbrows/
├── index.html          ← Página principal (imagem já embutida)
├── style.css           ← Estilos Mobile First
├── script.js           ← Interações e integração WhatsApp
├── assets/
│   ├── luana-maria.jpg ← Foto original (JPEG)
│   └── luana-maria.png ← Foto original (cópia)
└── README.md           ← Este arquivo
```

---

## 🚀 Publicar na Vercel (Recomendado)

### Opção A — Arrastar e soltar (mais fácil)
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"New Project"**
3. Selecione **"Upload"** e arraste a pasta toda
4. Clique em **Deploy** — pronto!

### Opção B — Via GitHub
1. Crie um repositório no GitHub e faça upload dos arquivos
2. No Vercel, importe o repositório
3. Deploy automático

---

## 🌐 Publicar no GitHub Pages

1. Crie um repositório (ex: `repairbrows-site`)
2. Faça upload de todos os arquivos para a branch `main`
3. Vá em **Settings → Pages → Source → main → / (root)**
4. Aguarde 1–2 minutos para o link ficar ativo

---

## 🖼️ Como Adicionar Fotos de Antes & Depois

1. Coloque suas imagens na pasta `assets/` (ex: `antes1.jpg`, `depois1.jpg`)
2. No `index.html`, localize os blocos `.ad-placeholder` na seção `metodo`
3. Substitua por tags `<img>`:
   ```html
   <img src="assets/antes1.jpg" alt="Antes" style="width:100%;height:100%;object-fit:cover;" />
   ```

Faça o mesmo para os `.resultado-placeholder` na seção `resultados`.

---

## ✏️ Personalizações Rápidas

| O que alterar | Onde |
|---|---|
| Número do WhatsApp | Buscar `5511991675603` em `index.html` e `script.js` |
| Instagram | Buscar `mariasobrancelhas_` em `index.html` |
| Link do Ebook | Buscar `pay.kiwify.com.br` em `index.html` |
| Endereço/Horários | Seção `<footer>` em `index.html` |
| Depoimentos | Seção `.depoimentos` em `index.html` |
| Cores | Variáveis `:root` no início de `style.css` |

---

## 📞 Dados Configurados

- **WhatsApp:** +55 11 99167-5603
- **Instagram:** @mariasobrancelhas_
- **Ebook:** https://pay.kiwify.com.br/Dlbnrcc
- **Endereço:** Av. Fiorelli Peccicacco, 1035 — Perus, São Paulo SP

---

## 🛠️ Tecnologias

- HTML5 · CSS3 · JavaScript Vanilla
- Google Fonts: Cormorant Garamond + Jost
- Zero dependências — abre direto no navegador
