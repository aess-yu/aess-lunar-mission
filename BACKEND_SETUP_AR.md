# AESS YU — Backend setup (Google Sheets + Apps Script)

## جاهز في الحزمة
- `Code.gs`: API للقراءة العامة من Google Sheets، مع دالة تنشئ الـ 6 Tabs تلقائياً.
- `sheet-templates/*.csv`: قوالب الأعمدة والبيانات التجريبية.
- `config.js`: مكان وضع رابط الـ API ورابط المحاكاة.
- `index.html`: الواجهة تقرأ البيانات تلقائياً وتستخدم `data.json` عند تعذر الاتصال.

## النشر لأول مرة (من حسابك)
1. افتحي Google Sheets وأنشئي Spreadsheet جديد **لبيانات عامة فقط**.
2. Extensions > Apps Script، الصقي محتويات `Code.gs` واحفظي.
3. اختاري الدالة `setupDatabase` واضغطي Run، ثم وافقي على الأذونات. تنشأ ستة Tabs.
4. افتحي كل CSV في `sheet-templates` وانسخي البيانات إلى الـ Tab المطابق، بدءاً من A1. أو املئي الأعمدة يدوياً. لا تستخدمي أرقام مواقع وهمية كبيانات علمية.
5. اختاري `testDatabase` واضغطي Run ثم Execution log للتأكد من قراءة الصفوف.
6. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone > Deploy.
7. انسخي رابط `/exec` إلى `SHEETS_API_URL` في `config.js` مع الإبقاء على علامات الاقتباس.
8. ارفعي **محتويات** مجلد `aess-ready-website` إلى GitHub repository، ثم Settings > Pages > Deploy from branch > main > root.
9. افتحي الموقع وتحققي أن صفحة Edit Content تعرض `Connected to Google Sheets`، ثم غيري اسم عضو في Sheet وحدثي الصفحة.

## ملاحظات مهمة
- Google Sheets مصدر بيانات **عام للقراءة فقط** في هذا التصميم؛ لا تضيفي بيانات شخصية أو API keys.
- تغيير خلايا Sheet يظهر بعد تحديث الموقع؛ تعديل كود Apps Script يتطلب إصدار Deployment جديد.
- `Simulation_Data` مُجهّز لسلاسل زمنية؛ إدخال بياناته لا يشغّل محاكاة فلكية تلقائياً.
- لتضمين محاكاة منفصلة، ضعي رابطها العام في `SIMULATION_URL` داخل `config.js`.
- لتحميل موديل ثلاثي الأبعاد، ضعي رابط `.glb` في `Landing_Sites.model_url` (على نفس موقع GitHub Pages أو عنوان HTTPS يسمح بالتحميل).
- الـ AI Assistant الموجود في الواجهة تجريبي؛ لا توجد خدمة AI مدفوعة أو مفتاح API مخزّن.
- JSONP مناسب لبيانات القراءة العامة، وليس لحسابات المستخدمين أو العمليات الحساسة.
- إن كان رابط Google Apps Script لا يسمح باختيار `Anyone`، راجعي إعدادات حسابك/مؤسستك.
