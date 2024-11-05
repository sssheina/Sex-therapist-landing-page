// Включение и отключение Google Analytics
const enableAnalytics = () => {
  gtag('config', 'G-CJMGRT9H7E', { 'send_page_view': true });
  console.log("Google Analytics включена."); // Лог для проверки
};

const disableAnalytics = () => {
  console.log("Google Analytics отключена."); // Лог для проверки
  gtag('config', 'G-CJMGRT9H7E', { 'send_page_view': false }); // Отключение отправки данных
};

// Включение и отключение Яндекс.Метрики
const enableYandexMetrika = () => {
  ym(98781094, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "data Layer"
  });
  console.log("Яндекс.Метрика включена."); // Лог для проверки
};

const disableYandexMetrika = () => {
  console.log("Яндекс.Метрика отключена."); // Лог для проверки
  ym(98781094, 'pause'); // Временно приостанавливает сбор данных
};

// Экспорт функций для использования в других модулях
export { enableAnalytics, disableAnalytics, enableYandexMetrika, disableYandexMetrika };


