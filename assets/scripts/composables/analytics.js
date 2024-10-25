// Подключение Google Analytics (пример)
const loadAnalytics = () => {
    // Вставьте код Google Analytics здесь
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-XXXXX-Y', 'auto'); // Замените UA-XXXXX-Y на ваш ID
    ga('send', 'pageview');
  };
  
  // Вызов функции загрузки аналитики
  const enableAnalytics = () => {
    loadAnalytics();
    console.log("Аналитика включена."); // Лог для проверки
  };
  
  // Вызов функции отключения аналитики
  const disableAnalytics = () => {
    console.log("Аналитика отключена."); // Лог для проверки
    if (typeof ga === "function") {
        ga('set', 'sendHitTask', null); // Останавливаем отправку данных
        console.log("Отправка данных аналитики отключена."); // Лог для проверки
    } else {
        console.log("Google Analytics не инициализирован."); // Лог, если GA не инициализирован
    }
};
  
  // Экспорт функций для использования в других модулях
  export { enableAnalytics, disableAnalytics };