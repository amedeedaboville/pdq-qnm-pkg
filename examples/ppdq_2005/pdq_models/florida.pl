#!/usr/bin/perl
# florida.pl
use pdq;

$STEP = 100;
$MAXUSERS = 3000;
$think = 10;        #seconds
$srvt1 = 0.0050;    #seconds
$srvt2 = 0.0035;    #seconds
$srvt3 = 0.0020;    #seconds
$Dmax = $srvt1;
$Rmin = $srvt1 + $srvt2 + $srvt3;

# print the header ...
printf("%5s\t%6s\t%6s\t%6s\t%5s\t%6s\t%6s\t%6s\n", 
    "  N  ", "  X  ", "  Xlin ", " Xmax ", 
    "  N  ", "  R  ", "  Rmin ", " Rinf ");

# iterate up to $MAXUSERS ...
for ($users = 1; $users <= $MAXUSERS; $users++) {
    pdq::Init("Florida Model");
    $pdq::streams = pdq::CreateClosed("benchload", 
        $pdq::TERM, $users, $think);        
    $pdq::nodes  = pdq::CreateNode("Node1", $pdq::CEN, $pdq::FCFS);
    $pdq::nodes  = pdq::CreateNode("Node2", $pdq::CEN, $pdq::FCFS);
    $pdq::nodes  = pdq::CreateNode("Node3", $pdq::CEN, $pdq::FCFS);   
    pdq::SetDemand("Node1", "benchload", $srvt1);
    pdq::SetDemand("Node2", "benchload", $srvt2);
    pdq::SetDemand("Node3", "benchload", $srvt3);

    pdq::Solve($pdq::APPROX);

    if ( ($users == 1) or ($users % $STEP == 0) ) { 
        # print as TAB separated columns ... 

        printf("%5d\t%6.2f\t%6.2f\t%6.2f\t%5d\t%6.2f\t%6.2f\t%6.2f\n", 
            $users,
            pdq::GetThruput($pdq::TERM, "benchload"),
            $users / ($Rmin + $think),
            1 / $Dmax,
            $users,
            pdq::GetResponse($pdq::TERM, "benchload"),
            $Rmin,
            ($users * $Dmax) - $think
        );
    }
}
