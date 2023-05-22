!function(t){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],t):"object"==typeof exports?t(require("jquery")):t(jQuery)}(function(d,h,t){d.fn.autocomplete=function(e){e=e||{};e=d.extend(!0,{},{limit:0,data:[]},e);var o=d(this),t=o.next(),n=`
            <% _.each(data, function(item) { %>
                <li value="<%=item.value%>"><%=item.text%></li>
            <% }); %>
        `;function i(t){if(d.isArray(t)&&0<t.length){if("string"==typeof t[0]||"number"==typeof t[0]){var e=[];return t.forEach(function(t){e.push({value:String(t),text:String(t)})}),e}}else if("object"==typeof t){var n,e=[];for(n in t)e.push({value:n,text:t[n]});return e}return t}function a(t,e){r.find(".options").html(h.template(n)({data:t})),r.find(".options li").on("click",function(){var t=d(this).attr("value");o.val(t).change(),r.hide()}),0<t.length&&!e?r.show():r.hide()}var u=i(e.data),l=u;0<u.length&&0<e.limit&&(l=u.slice(0,e.limit));l=d(h.template(`
            <div class="autocomplete">
                <div class="result">
                    <ul class="options">
                        <% _.each(data, function(item) { %>
                            <li value="<%=item.value%>"><%=item.text%></li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `)({data:l}));o.after(l);var c,f,r=l.find(".result");function s(t){e.async(t,function(t){a(i(t))})}function v(){var n=d.trim(o.val()),i=[];0<n.length?u.forEach(function(t){var e;0<=t.value.indexOf(n)&&(e=t.value,t=t.value.split(n).join("<b>"+n+"</b>"),i.push({value:e,text:t}))}):i=u.slice(0),a(i=0<i.length&&0<e.limit?i.slice(0,e.limit):i)}return r.before(o),r.after(t),d("body").on("click",function(){r.hide()}),l.on("click",function(t){t.stopPropagation()}),r.find(".options li").on("click",function(){var t=d(this).attr("value");o.val(t).change(),r.hide()}),e.async?(o.on("focus",function(){0!=o.val().length?s(o.val()):r.hide()}),o.on("keyup",function(){clearTimeout(c),0!=o.val().length?c=setTimeout(function(){s(o.val())},300):r.hide()})):(o.on("focus",function(){v()}),o.on("keyup",function(){clearTimeout(c),c=setTimeout(function(){v()},50)}),f=function(t){u=i(t),o.val("").change(),a(u,!0)}),{setData:f}}});
//# sourceMappingURL=jquery.prac.com.autocomplete.js.map