use std::fs;

fn main() {
    let contents = fs::read_to_string("./input.txt")
    .expect("something went wrong!");
    let mut adapter_list = Vec::new();

    contents.lines().for_each(|line| adapter_list.push(line.parse::<u64>().unwrap()));
    adapter_list.sort();

    adapter_list.insert(0, 0);
    adapter_list.push(adapter_list.last().unwrap() + 3);

    println!("{}", solve_part_1(&adapter_list));
    println!("{}", solve_part_2(&adapter_list));
}

fn solve_part_1(adapters: &Vec<u64>) -> u64 {
    let mut ones = 0;
    let mut threes = 0;

    for window in adapters.windows(2) {
        match window[1] - window[0] {
            1 => ones += 1,
            3 => threes += 1,
            _ => (),
        }
    }
    ones * threes
}

fn solve_part_2(adapters: &Vec<u64>) -> u64 {
    let mut slices = vec![];
    let mut current_slice = vec![];

    for window in adapters.windows(2) {
        match window[1] - window[0] {
            1 => current_slice.push(window[0]),
            3 => {
                current_slice.push(window[0]);
                slices.push(current_slice);
                current_slice = vec![];
            }
            _ => (),
        }
    }

    slices
        .iter()
        .map(|slice| match slice.len() {
            1 => 1,
            2 => 1,
            3 => 2,
            4 => 4,
            5 => 7,
            _ => panic!("unexpected slice of size N > 5 consecutive 1-diff elements"),
        })
        .product()
}
