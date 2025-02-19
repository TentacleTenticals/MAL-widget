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

# Патчлист
* 1.0.1:
  * Попытка исправить баг, возникающий при загрузке выгруженной вкладки (Hibernated tab was loaded, need retry). С ней выдаётся неверный объект, что ломает скрипт.
    * Баг древний и я думал что удалось его пофиксить, но он всё равно вылез. На этот раз не вылезал, сколько раз не прогонял.
* 1.0.2:
  * Новая тестовая настройка **sitesImport**. Она позволяет импортировать поддержку сайтов используя ссылку на код
  * **Вам всё равно придётся** прописать ссылку на сайт в "шапке" скрипта, как вы делаете при обычном добавлении поддержки
  * true (активна)/ false (не активна)
  * Если она активна, то при запуске скрипта с ней создастся новое значение в [Данные] "**sites**"
  * **sites** позволяет импортировать поддержку сайтов по ссылке
    * Формат ссылки обязан быть на манер [https]cdn.jsdelivr.net/gh/[никнейм гитхаб акка]/[название проекта]@[версия]/[путь]
    * К примеру, https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/export/example.js
* 1.0.3:
  * Новая настройка **recommendations**
    * Позволяет видеть список рекомендаций у текущего тайтла. Список рекомендаций идёт от MAL API
* 1.0.4-1.0.7:
  * Несколько фиксов стилей, фикс бага что ломал скрипт
  * Добавлен Алертер - элемент что будет сообщать об ошибке/важном сообщении
* 1.0.8:
  * Замечен баг в **textMatcher**, починено...вроде. Буду на стрёме, надо будет попрогонять тесты с ним

# Какие сайты поддерживаются
* animespirit
* animejoy
* mangalib
* поддержка сайта, добавленная [вручную](https://github.com/TentacleTenticals/MAL-widget/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D1%85-%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2#%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B0%D0%BA%D0%BE%D0%B3%D0%BE-%D0%BB%D0%B8%D0%B1%D0%BE-%D1%81%D0%B0%D0%B9%D1%82%D0%B0).

# Инструкция
[Вики](https://github.com/TentacleTenticals/MAL-widget/wiki)

# Принцип действия
Скрипт основан на поиске названия тайтла на странице сайта аниме/манги, с дальнейшим использованием MAL API.

Виджет...
 1. находит название тайтла на странице
 2. начинает поиск по названию тайтла (MAL)
 3. находит ID верного тайтла (MAL)
 4. получает всю информацию о тайтле по его ID (MAL)
