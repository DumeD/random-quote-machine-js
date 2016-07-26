var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=en&jsonp=?";
var a = 9;
$(document).ready(function() {
  $("#gen").on("click",function() {
    $.getJSON(url, function(val) {
      var quotes = [];
      quotes.push(JSON.stringify(val.quoteText));
      quotes.push(JSON.stringify(val.quoteAuthor));
      if(quotes[1] === '""'){
        quotes[1] = '"Unknown"';
      }
      var quote = quotes[0].replace(/;/g, "");
      var author = quotes[1].replace(/"/g, "");
      if(quote.length + author.length > 140) {
          $(".long-tweet").text("This quote is too long to be tweeted");
          $("#twitter").attr('class', 'btn btn-danger disabled');
      }else {
        $("#twitter").attr('class', 'btn btn-primary');
        $(".long-tweet").text("");
    }
      $('#quote').html(quote);
      $('#author').html(author);
      var quot = 'https://twitter.com/intent/tweet?text=' + quote + ' ' + author;

      $("#twitter").unbind().on('click', function() {
        window.open(quot, 'twitter');
      });
    });
  });
});
