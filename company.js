function initializeBalance() {
            const initialBalance = 0; // تعيين الرصيد الافتراضي
            const currentPage = window.location.pathname.split('/').pop(); // الحصول على اسم الصفحة
            const storedBalance = localStorage.getItem(`balance_${currentPage}`);
            
            if (storedBalance === null) {
                localStorage.setItem(`balance_${currentPage}`, initialBalance);
                document.getElementById('userBalance').textContent = initialBalance.toFixed(2) + '€';
            } else {
                document.getElementById('userBalance').textContent = parseFloat(storedBalance).toFixed(2) + '€';
            }
        }

        function updateLocalStorageBalance(newBalance) {
            const currentPage = window.location.pathname.split('/').pop(); // الحصول على اسم الصفحة
            localStorage.setItem(`balance_${currentPage}`, newBalance.toFixed(2));
        }

        window.onload = function() {
            initializeBalance();

            // استرجاع المبالغ من localStorage
            const amountToSend = parseFloat(localStorage.getItem('amountToSend')) || 0;
            const amountToWithdraw = parseFloat(localStorage.getItem('amountToWithdraw')) || 0;

            if (amountToSend > 0) {
                const currentPage = window.location.pathname.split('/').pop(); // الحصول على اسم الصفحة
                const currentBalance = parseFloat(document.getElementById('userBalance').textContent.replace('€', ''));
                const newBalance = currentBalance + amountToSend;
                updateLocalStorageBalance(newBalance);
                document.getElementById('userBalance').textContent = newBalance.toFixed(2) + '€';
                localStorage.removeItem('amountToSend');  // حذف المبلغ بعد التحديث
                alert('تم استقبال المال بنجاح!');
            }

            if (amountToWithdraw > 0) {
                const currentPage = window.location.pathname.split('/').pop(); // الحصول على اسم الصفحة
                const currentBalance = parseFloat(document.getElementById('userBalance').textContent.replace('€', ''));
                if (amountToWithdraw > currentBalance) {
                    alert('لا يوجد رصيد كافٍ للسحب.');
                    localStorage.removeItem('amountToWithdraw');  // حذف المبلغ إذا كان غير كافٍ
                    return;
                }
                const newBalance = currentBalance - amountToWithdraw;
                updateLocalStorageBalance(newBalance);
                document.getElementById('userBalance').textContent = newBalance.toFixed(2) + '€';
                localStorage.removeItem('amountToWithdraw');  // حذف المبلغ بعد التحديث
                alert('تم سحب المال بنجاح!');
            }
        };