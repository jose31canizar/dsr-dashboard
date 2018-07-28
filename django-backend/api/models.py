from django.db import models


class Periodicity(models.Model):

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=24, unique=True)

    class Meta:
        db_table = 'periodicity'


class Territory(models.Model):
    name = models.CharField(max_length=48)
    code_2 = models.CharField(max_length=2)
    code_3 = models.CharField(max_length=3)

    class Meta:
        db_table = 'territory'
        verbose_name = 'territory'
        verbose_name_plural = 'territories'
        ordering = ('name', )


class Currency(models.Model):
    name = models.CharField(max_length=48)
    symbol = models.CharField(max_length=4)
    code = models.CharField(max_length=3)

    class Meta:
        db_table = 'currency'
        verbose_name = 'currency'
        verbose_name_plural = 'currencies'


class DSR(models.Model):

    class Meta:
        db_table = 'dsr'

    STATUS_ALL = (
        ('upcoming', 'UPCOMING'),
        ('failed', 'FAILED'),
        ('completed', 'COMPLETED'),
    )

    path = models.CharField(max_length=256, null=True)
    date_start = models.DateField(null=False)
    date_end = models.DateField(null=False)

    status = models.CharField(
        choices=STATUS_ALL,
        default=STATUS_ALL[0][0],
        max_length=48)

    periodicity = models.ForeignKey(Periodicity, on_delete=models.CASCADE)

    territory = models.ForeignKey(Territory, on_delete=models.CASCADE)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)


class Statistics(models.Model):

    class Meta:
        db_table = 'statistics'

    resources = models.IntegerField(default=0, null=False)
    release = models.IntegerField(default=0, null=False)
    release_transactions = models.IntegerField(default=0, null=False)
    net_revenue = models.FloatField(default=0, null=False)
    count_sales = models.BigIntegerField(default=0, null=False)
    free_units = models.BigIntegerField(default=0, null=False)

    dsr = models.OneToOneField(DSR, on_delete=models.CASCADE)
