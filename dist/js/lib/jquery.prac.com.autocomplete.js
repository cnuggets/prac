!function(e){"function"==typeof define&&define.amd?define(["jquery","underscore","bootstrap","common"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m,g,e){m.fn.autocomplete=function(o){o=o||{};o=m.extend(!0,{},{limit:0,data:[],onChange:function(e){}},o);var i,a=m(this),e=a.next(".invalid-feedback"),n=`
            <% _.each(data, function(item) { %>
                <li value="<%=item.value%>"><%=item.text%></li>
            <% }); %>
        `;function t(e){if(m.isArray(e)&&0<e.length){if("string"==typeof e[0]||"number"==typeof e[0]){var t=[];return e.forEach(function(e){t.push({value:String(e),text:String(e)})}),t}}else if("object"==typeof e){var n,t=[];for(n in e)t.push({value:n,text:e[n]});return t}return e}function l(e,t){m(".autocomplete .result").hide(),v.find(".options").html(g.template(n)({data:e})),v.find(".options li").on("click",function(){var e=m(this).attr("value");a.val(e).change(),v.hide(),o.onChange(e)}),i=void 0,0<e.length&&!t?v.show():v.hide()}function c(e){var t,n;v.is(":hidden")||(t=(n=v.find(".options li")).length,null==i&&(i=0<e?0:1),i+=e,(i%=t)<0&&(i+=t),(e=i-1)<0&&(e+=t),n.removeClass("selected"),(n=n.eq(e)).addClass("selected"),v.find(".options").scrollTop(e*n.height()))}function u(){0<v.find(".options li.selected").length?v.find(".options li.selected").trigger("click"):o.onChange(a.val())}var f=t(o.data),r=f;0<f.length&&0<o.limit&&(r=f.slice(0,o.limit));r=m(g.template(`
            <div class="autocomplete">
                <div class="result">
                    <ul class="options">
                        <% _.each(data, function(item) { %>
                            <li value="<%=item.value%>"><%=item.text%></li>
                        <% }); %>
                    </ul>
                </div>
            </div>
        `)({data:r}));a.after(r);var s,d,v=r.find(".result");function h(e){o.async(e,function(e){l(t(e))})}function p(){var n=m.trim(a.val()),i=[];0<n.length?f.forEach(function(e){var t;0<=e.value.indexOf(n)&&(t=e.value,e=e.value.split(n).join("<b>"+n+"</b>"),i.push({value:t,text:e}))}):i=f.slice(0),l(i=0<i.length&&0<o.limit?i.slice(0,o.limit):i)}return v.before(a),v.after(e),m("body").on("click",function(){v.hide()}),r.on("click",function(e){e.stopPropagation()}),v.find(".options li").on("click",function(){var e=m(this).attr("value");a.val(e).change(),v.hide()}),o.async?(a.on("focus",function(){(i=0)!=a.val().length?h(a.val()):v.hide()}),a.on("keyup",function(e){13==e.keyCode?u():38==e.keyCode?c(-1):40==e.keyCode?c(1):(clearTimeout(s),0!=a.val().length?s=setTimeout(function(){h(a.val())},300):v.hide())})):(a.on("focus",function(){i=0,p()}),a.on("keyup",function(e){13==e.keyCode?u():38==e.keyCode?c(-1):40==e.keyCode?c(1):(clearTimeout(s),s=setTimeout(function(){p()},50))}),d=function(e){f=t(e),a.val("").change(),l(f,!0)}),{setData:d}}});
//# sourceMappingURL=jquery.prac.com.autocomplete.js.map