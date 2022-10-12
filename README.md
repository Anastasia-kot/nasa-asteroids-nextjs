# Онлайн-сервис по мониторингу и уничтожению опасных астероидов  
### https://nasa-asteroids-nextjs.vercel.app/asteroids

## Использованный стек/ технические требования:
+ Адаптивная вёрстка;
+ По макету Figma https://www.figma.com/file/UOdZ5Qzkif1Ideye76OpjA/Armaggedon-V2?node-id=0%3A1
+ Взаимодействие с API NASA (https://api.nasa.gov);
+ Next.js;
+ Без использования redux (текущие данные хранятся в LocalStorage);
+ Стилизация с помощью CSS модулей;
+ Кроссбраузерность в последних версиях браузеров (chrome, firefox, safari, edge);
+ TypeScript; 
+ тесты; `(в процессе покрытия тестами)`

 ## Главная страница
![image](https://user-images.githubusercontent.com/96003382/195371985-3cb5fa19-d4d4-4268-9959-f83c306f1a59.png)
+ На главной список подлетов астероидов к Земле от текущей даты в бесконечность. 
+ Подгрузка при скролле порциями. 
+ По каждому астероиду: название, размер, оценка опасности, как близко будет к Земле, точная дата максимального подлёта. Иконка сближения в зависимости от опасности. 
+ Фильтр по опасности. И опция вывода расстояний: в километрах или расстояниях до Луны.
+ В фоне шапки есть изображение, которое должно быть получено в API NASA APOD (картинка дня).

 ## Карточка товара (астероида)
![image](https://user-images.githubusercontent.com/96003382/195372609-d84ee7f6-0c57-4159-af32-e738f1e77141.png)
+ В подробной информации по астероиду помимо инфы, перечисленной выше, список всех его сближений. 
+ По каждому сближению: скорость относительно Земли, время максимального сближения с Землей, расстояние до Земли, по орбите вокруг чего летит.

 ## Корзина для заказа товара (астероида)
 ![image](https://user-images.githubusercontent.com/96003382/195373038-87a1569c-73a4-4083-bd69-e77ed77b65e7.png)
+ Список на уничтожение — это некая корзина, где отображаются выбранные подлеты астероидов. 
+ В конце страницы кнопка заказа бригады им. Брюса Уиллиса на выбранные астероиды. Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу.

  

