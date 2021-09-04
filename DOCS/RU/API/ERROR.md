<h3 name="begin">Добро пожаловать в руководство по ошибкам в API HIVE DISCUSSION.</h3>

<nav>
  <h3>Навигация:</h3>
  <ul>
    <li><a href="../WELCOME.md#api">Вернуться к навигации по API.</a></li>
    <li><a href="#0">0 - Invalid api_key.</a></li>
    <li><a href="#1">1 - Invalid permission.</a></li>
    <li><a href="#2">2 - Invalid user.</a></li>
    <li><a href="#3">3 - Invalid request method.</a></li>
  </ul>
</nav>





<div name="0">
  <h3>0 - Invalid api_key.</h3>
  <p>Возникает если апи ключ (api_key) неверный.</p>
  Возвращает:

```js
["error",0]
```

  <a href="#begin">В начало.</a>
</div>



<div name="">
  <h3>1 - Invalid permission.</h3>
  <p>Возникает если у пользователя нет разрешения на выполнения действия (Ошибка также выдает номер разрешения необходимого разрешения).</p>
  Возвращает:

```js
["error",1,номер необходимого разрешения]
```

  <a href="#begin">В начало.</a>
</div>



<div name="2">
  <h3>2 - Invalid user.</h3>
  <p>Возникает при попытке взаимодействия с пользователем которого нет или был удален (Ошибка также выдает айди пользователя).</p>
  Возвращает:

```js
["error",2,айди неверного пользователя]
```

  <a href="#begin">В начало.</a>
</div>



<div name="3">
  <h3>3 - Invalid request method.</h3>
  <p>Возникает при отправлении запросов не являющихся POST на страницы API</p>
  Возвращает:

```js
["error",3,неверный метод]
```

  <a href="#begin">В начало.</a>
</div>





<!--
template link
<li><a href="#"> - .</a></li>

template error
<div name="">
  <h3> - .</h3>
  <p>.</p>
  Возвращает:

```js
```

  <a href="#begin">В начало.</a>
</div>
-->