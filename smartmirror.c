#include <stdio.h>
#include <wiringPi.h>
#include <time.h>

const int motion0 = 22;
const int motion1 = 4;
const int motion2 = 17;
const int motion3 = 27;

void writeout(char arg1)
{
	printf("hello\n");
	FILE *fp;
	fp = fopen("output.txt","w+");
	
	switch (arg1)
	{
		case '0': fputs("0\n", fp);
		break;
		case '1': fputs("1\n", fp);
		break;
		case '2': fputs("2\n", fp);
		break;
		case '3': fputs("3\n", fp);
		break;
		default : fputs("error", fp);
		break;
	}

	fclose(fp);
}

int main(void)
{
	wiringPiSetupGpio();
	//wiringPiSetupSys();

	pinMode(motion0, INPUT);
	pinMode(motion1, INPUT);
	pinMode(motion2, INPUT);
	pinMode(motion3, INPUT);

	while (1)
	{
		if (digitalRead(motion0))
		{
			printf("motion0(22) is high\n");
			writeout('0');
		}

		if(digitalRead(motion1))
		{
			printf("motion1(4) is high\n");
			writeout('1');
		}

		if(digitalRead(motion2))
		{
			printf("motion2(17) is high\n");
			writeout('2');
		}

		if(digitalRead(motion3))
		{
			printf("motion3(27) is high\n");
			writeout('3');
		}

		else
		{
			printf("None are high\n");
			writeout('9');
		}

		delay(10000);
	}
}
