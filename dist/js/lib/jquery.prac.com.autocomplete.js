!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m,y,e){m.fn.autocomplete=function(t){t=t||{};t=m.extend(!0,{},{limit:0,data:[]},t);var o=m(this),e=o.next(),i=`
            <% _.each(data, function(item) { %>
                <li value="<%=item.value%>"><%=item.text%></li>
            <% }); %>
        `;function n(e){if(m.isArray(e)&&0<e.length){if("string"==typeof e[0]||"number"==typeof e[0]){var t=[];return e.forEach(function(e){t.push({value:String(e),text:String(e)})}),t}}else if("object"==typeof e){var i,t=[];for(i in e)t.push({value:i,text:e[i]});return t}return e}var a=0;function l(e,t){m(".autocomplete .result").hide(),v.find(".options").html(y.template(i)({data:e})),v.find(".options li").on("click",function(){var e=m(this).attr("value");o.val(e).change(),v.hide()}),(a=0)<e.length&&!t?v.show():v.hide()}function u(e){var t,i;v.is(":hidden")||(t=(i=v.find(".options li")).length,a+=e,(a%=t)<0&&(a+=t),(e=a-1)<0&&(e+=t),i.removeClass("selected"),(i=i.eq(e)).addClass("selected"),e=v.find(".options").offset().top,v.find(".options").scrollTop(i.offset().top-e))}function c(){v.is(":hidden")||v.find(".options li.selected").trigger("click")}var f=n(t.data),s=f;0<f.length&&0<t.limit&&(s=f.slice(0,t.limit));s=m(y.template(`
            <div class="autocomplete">
                <div class="result">
                    <ul class="options">
                        <% _.each(data, function(item) { %>
                            <li value="<%=item.value%>"><%=item.text%></li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `)({data:s}));o.after(s);var r,d,v=s.find(".result");function h(e){t.async(e,function(e){l(n(e))})}function p(){var i=m.trim(o.val()),n=[];0<i.length?f.forEach(function(e){var t;0<=e.value.indexOf(i)&&(t=e.value,e=e.value.split(i).join("<b>"+i+"</b>"),n.push({value:t,text:e}))}):n=f.slice(0),l(n=0<n.length&&0<t.limit?n.slice(0,t.limit):n)}return v.before(o),v.after(e),m("body").on("click",function(){v.hide()}),s.on("click",function(e){e.stopPropagation()}),v.find(".options li").on("click",function(){var e=m(this).attr("value");o.val(e).change(),v.hide()}),t.async?(o.on("focus",function(){0!=o.val().length?h(o.val()):v.hide()}),o.on("keyup",function(e){13==e.keyCode?c():38==e.keyCode?u(-1):40==e.keyCode?u(1):(clearTimeout(r),0!=o.val().length?r=setTimeout(function(){h(o.val())},300):v.hide())})):(o.on("focus",function(){p()}),o.on("keyup",function(e){13==e.keyCode?c():38==e.keyCode?u(-1):40==e.keyCode?u(1):(clearTimeout(r),r=setTimeout(function(){p()},50))}),d=function(e){f=n(e),o.val("").change(),l(f,!0)}),{setData:d}}});
//# sourceMappingURL=jquery.prac.com.autocomplete.js.map