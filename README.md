# MAL Widget

Данный скрипт добавляет виджет MAL на аниме и манга сайты.
Виджет даёт
* менять:
  * статус просмотра/прочтения
  * количество просмотренного/прочитанного
  * оценку
* получать данные о текущем тайтле:
  * название
  * рейтинги
  * ID
  * ссылку на тайтл

[Установить MAL Widget](https://raw.githubusercontent.com/TentacleTenticals/MAL-widget/refs/heads/main/main/main.user.js)

# Принцип действия
Скрипт основан на поиске названия тайтла на странице сайта аниме/манги, с дальнейшим использованием MAL API.

Виджет...
 1. находит название тайтла на странице
 2. начинает поиск по названию тайтла (MAL)
 3. находит ID верного тайтла (MAL)
 4. получает всю информацию о тайтле по его ID (MAL)

Особенность скрипта в особой технике ниндзя "**textMatch**" - она сравнивает название тайтла на странице с названием на MAL
1. у текста удаляются любые символы (в том числе уникод) и пробелы, оставляя лишь буквы и цифры
2. идёт перегонка всех букв в строчные
3. скрипт сверяет местонахождение каждой буквы и цифры
Пока они идут вровень, это считается полным совпадением
    * ishuzokureviewers у первого
    * ishuzokureviewers у второго
    * это будет 100% совпадением
    * -
    * ishuzokureviewers у первого
    * ishuzokukannareviewers у второго
    * это точно не будет 100% совпадением

Таким образом, скрипт может определить верное название тайтла в большинстве случаев.
Зачем эта проверка нужна? Всё просто - дело в том, что в немалой доли сайтов названия тайтлов отличаются от названий в MAL, и без подобной проверки виджет срабатывал бы лишь на части тайтлов.

# Поддержка сайтов
MAL Widget поддерживает несколько сайтов по умолчанию, остальные сайты можно добавить самостоятельно.

## Добавление поддержки сайтов
Для этого потребуется изменение кода скрипта, никак иначе это не провернуть.

* Почему я не хочу ввести поддержку всех возможных сайтов? Всё просто - это проблематично.
Мало того что сайтов много, так они ещё и развиваются/физически меняются, что может непосредственно влиять на сам виджет
* Большой список поддерживаемых сайтов потребует частой поддержки скрипта, чтобы виджет работал с каждым сайтом так, как должен
* Отдельный "бонус"... код скрипта несложно посмотреть, а значит перечисленные в нём списки сайтов возможно (возможно) могут стать причиной для их блока *сами знаете кем*. Перестраховочка
* Буду ли я добавлять ещё сайты? Не знаю. Крайне вероятно что это зависит от возможных просьб "ну добавь, а. Не понимаю я эти ваши html".
  * Как по мне в этом нет ничего сложного, так что шансы что кто-то сам не сможет добавить поддержку сайта не особо высоки

### Как проверить сможет-ли скрипт поддерживать N сайт
Достаточно наличия английского названия тайтла на сайте, поддержку которого вы хотите добавить.
**Это важно!** Без этого скрипт на сайте не заработает.

# Первичная настройка
При посещении поддерживаемого сайта, скрипт проверит наличие токенов MAL API. Если токенов не будет обнаружено, скрипт предложит их получить.

Для получения токенов, вам потребуется создать приложение MAL API.
После того как будут получены токены, скрипт начнёт работать.

## Создание приложения MAL
* Зайдите на сайт **[MAL](https://myanimelist.net/apiconfig)**
* Нажмите кнопку **Create ID**
* Вам откроется форма. Введите в неё данные:
  * App Type: web
  * Client ID: [*будет получен после создания приложения*]
  * Client Secret: [*будет получен после создания приложения*]
  * App Description: описание того, что будет делать это приложение. Не суть важно, т.к. проверяется этот текст нечасто, но лучше всё же перестраховаться и ввести вменяемое описание
  * App Redirect URL: ссылка на html страницу, которая будет обрабатывать запрос получения токенов. **Важная** вещь.
    * Скопируйте мой проект с GitHub, включите **GitHub Pages** в настройках проекта и получите ссылку на сайт
    * Ссылка на сайт будет в формате [проект].github.io/Redictoryus/fallback
  * Homepage URL: ссылка на домашнюю страницу приложения. Можете указать ваш скопированный проект, aka *[проект].github.io/Redictoryus/*
  * Commercial/Non-Commercial: non-commercial
  * Name/Company Name: никнейм или выдуманное имя
  * Purpose of Use: hobbyist/other
* Нажмите **Submit**
* Если в итоге всех манипуляций у приложения будет писать "PUBLISHED", то это будет означать что приложение создано

## Отправка запросов на MAL API
У апи проблема с получением запросов - отправка их напрямую вызовет ошибку CORS. Чтобы это обойти, вам потребуется создать приложение/сервис, которое будет получать fetch запросы, и передавать их MAL API, и затем уже возвращать вам.

У вас два варианта - [Glitch](glitch.com), или [Cloudflare](https://dash.cloudflare.com).

> Крайне рекомендую второй вариант
> Glitch после бездействия приложения отправляет его в "сон", а "пробуждение" занимает десятка два секунд, что как по мне критично.
> Лимит часов активности - 1000 в месяц

> Cludflare Workers такой проблемой не страдает, и работает почти мгновенно.
> Лимит запросов - 1000 в день, чего более чем хватает

### Создание catcherUrl
Тут нет ничего сложного, просто следуйте инструкции.

#### CloudFlare Workers
1. Зайдите на сайт [Cloudflare](https://dash.cloudflare.com)
2. Создайте аккаунт
3. Выберите вкладку Compute **Cloudflare Workers**
4. Нажмите кнопку **Create**
5. Нажмите кнопку **Create Worker**
6. Придумайте название воркера. Ссылка на воркер будет ему соответствовать
  * формат ссылки воркера такой: [название воркера].[имя аккаунта].workers.dev
7. Нажмите кнопку **Deploy**
8. После создания воркера, напишет что-то на манер *You can preview your project at* [ссылка на ваш воркер]. Скопируйте ссылку (это можно будет сделать позже)
9. Нажмите кнопку **Edit Code**
* или...
9. на странице созданного воркера в "шапке" справа от [*Deployments Metrics Logs Integrations Settings*] найдите кнопку **Edit Code**
10. скопируйте код отсюда [GitHub](https://raw.githubusercontent.com/TentacleTenticals/Cloudflare-reverse-catcher/refs/heads/main/worker.js)
11. удалите весь код и вставьте скопированный из GitHub
12. Нажмите кнопку **Deploy**
13. получите ссылку на ваш воркер если вы не сделали это ранее
  * на странице созданного воркера в "шапке" справа от [*Deployments Metrics Logs Integrations Settings*] найдите кнопку **View this worker**
14. ссылка на ваш воркер это и есть **catcherUrl**

## Получение токенов
* Когда скрипт скажет о том, что данные сгенерированы, зайдите в настройки скрипта и введите перечисленное во вкладку *[Данные]* в **Info**
  * clientId: взять из приложения MAL API
  * clientSecret: взять из приложения MAL API
  * redirectUri: взять из приложения MAL API
  * catcherUrl: ссылка на ваш проект **catcherUrl**

# Добавление поддержки для какого-либо сайта
В коде скрипта, найдите **fc.initer**, а в ней **sites:** - это и есть фрагмент кода что добавляет поддержку сайтов.

Также вам потребуется добавить ссылку сайта в "шапке" скрипта.

В шапке:
```JS
// @match       https://mangalib.me/ru*
```

В fc.initer:
Пример кода для добавления поддержки:
```JS
{
  name:'mangalib',
  links: [['mangalib\.me/ru/manga/.+', 'manga']],
  func: {
    path: '.media-content.paper > div',
    pathTitle: '.page div>h2',
    divRetry: {max:6},
    timeout: 3000
  },
  main: 'mangalib\.me/ru.*',
  spa: true
}
```
* name: имя сайта. Должно отличаться от других имён в подобном коде.
* links: список ссылок сайта
  * Должно быть в формате ['ссылка', 'anime/manga']
  * Иными словами, если сайт поддерживает как аниме так и мангу, скрипт можно научить определять разницу на какой именно странице вы находитесь
* func: перечень необходимым параметров для функционирования виджета
  * path: HTML путь к элементу, куда будет встроен виджет
  * pathTitle: HTML путь к названию аниме/манги на странице
  * divRetry:  количество попыток виджета найти path и pathTitle
    * чем больше тем лучше, но смысла ставить больше 10 нет...наверное
  * timeout: таймер между попытками **divRetry**
    * 1000 = 1 секунда
    * чем больше тем лучше
  * divRetry и timeout в большинстве случаев используются на сайтах, что загружаются неспешно/по-особенному, из-за чего не все нужные элементы страницы могут успеть прогрузиться когда страница будет "готова"
    * Устанавливайте значения исходя из этих скоростей.
* main: главная ссылка сайта
* spa: тип сайта
  * SPA (true)
  * не SPA (false)

# Настройки скрипта
В коде скрипта, **fc.initer** имеет список настроек в **cfg**.
```JS
  timer: 1,
  malRetry: {try:0, max:3},
  textMatch: {percents:95, summ:5},
  theme: 'theme-dark'
```
* timer: частота обновления токенов MAL
  * 1 = один день
  * токены действуют 30 дней
  * скрипт имеет двойную проверку токенов
    * первая проверка определяет нужно-ли обновить токены (timer x1). Скрипт одновляет их без вашего участия автоматически
    *  вторая проверка определяет нужно-ли заново получить токены (timer x2). Здесь потребуется от вас вмешательство
       * иными словами, если вы выставили таймер в 5 дней, то вторичная проверка будет проверять 10 дней, и если они уже прошли то скрипт посчитает что токены полностью устарели и их нельзя обновить
   * обычно вполне достаточно выставить 10-14, если вы смотрите аниме/читаете мангу не каждый день. Это не даст токенам полностью устареть
     * если вы смотрите аниме/читаете мангу ещё реже, то лучше выставить число поменьше
     * 30 будет слишком много, велик шанс что токены придётся получать заново. Процесс конечно несложный, нажать три кнопки, но тем не менее
 * malRetry: количество повторных попыток запросов MAL API, если получена ошибка
 * textMatch: настройка совпадения текста названия тайтла на страницу аниме/манги с названием тайтла на MAL
   * percents: проценты
     * чем ниже, тем проверка менее требовательна, но и выше шансы на ложное срабатывание (в случае, если первый и второй сезоны имеют очень схожие названия, где отличие это буквально пара букв или цифр)
   * summ: кол-во символов
     * чем ниже, тем проверка менее требовательна
