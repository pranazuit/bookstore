
from django.core.validators import ValidationError
from django.core.validators  import RegexValidator

# Create your models here.

PAYMENT_STATUS = (
    (1,'รอชำระเงิน'),
    (2,'ชำระเงินแล้ว'),
    (3,'ชำระเงินไม่สำเร็จ'),
)

PAYMENT_METHOD = (
    ('promptpay','PromptPay'),
)