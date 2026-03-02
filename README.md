# Alvoplay 📻

Front-end da **Rádio Alvoplay** – sua rádio online com música 24 horas por dia.

## Funcionalidades

- 🎵 **Player ao vivo** – reprodução do stream em tempo real com play/pause
- 🔊 **Controle de volume** – slider e botão de mute acessíveis
- 📡 **Indicador de status** – "AO VIVO", "Conectando…" ou "OFF" com dot animado
- 🎚️ **Visualizador de áudio** – barras animadas durante a reprodução
- 📋 **Programação** – grade horária com destaque para o programa atual
- 📱 **Responsivo** – layout adaptado para mobile e desktop
- ♿ **Acessível** – atributos ARIA, roles semânticos e navegação por teclado

## Tecnologias

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- CSS puro com variáveis (sem dependências extras de UI)
- Google Fonts – Inter

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Configuração do stream

Edite `STREAM_URL` em `src/App.jsx` para apontar para o URL real do stream da Alvoplay.

## Licença

© Alvoplay. Todos os direitos reservados.
